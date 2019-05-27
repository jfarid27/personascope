import {
  chain,
  set,
  map,
  get,
  setWith,
  values,
  reduce,
  extend,
  cloneDeep,
} from 'lodash';
import {
  select,
  forceCenter,
  forceSimulation,
  forceLink,
  forceManyBody,
  schemeSet1,
  interpolateOranges,
} from 'd3';

function groupBySessionId(agg, row) {
  const session = row.SessionID;
  const delta = [row];
  return agg[session]
    ? set(agg, session, agg[session].concat(delta))
    : set(agg, session, delta);
}

function buildLinks(session) {
  const links = [];
  for (let i = 1; i < session.length; i++) {
    links.push({
      source: session[i - 1].Action,
      target: session[i].Action,
    });
  }
  return links;
}

function idByLength(row, id) {
  return set(row, 'id', id);
}

function hasActionAndSession(row) {
  const action = get(row, 'Action', false);
  const session = get(row, 'SessionID', false);
  return action && session && action !== '' && session !== '';
}

function groupBySourceTarget(total, row) {
  if (!total[row.source] || !total[row.source][row.target]) {
    setWith(total, [row.source, row.target], row, Object);
    set(total, [row.source, row.target, 'counts'], 1);
  } else {
    const n = total[row.source][row.target].counts;
    set(total, [row.source, row.target, 'counts'], n + 1);
  }
  return total;
}

function generateLinks(rowData) {
  return chain(rowData)
    .filter(hasActionAndSession)
    .reduce(groupBySessionId, {})
    .map(buildLinks)
    .flatten()
    .reduce(groupBySourceTarget, {})
    .values()
    .map(values)
    .flatten()
    .map(idByLength)
    .value();
}

function generateNodes(rowData) {
  return chain(rowData)
    .filter(hasActionAndSession)
    .reduce((agg, row) => {
      const n = get(agg, row.Action, 0);
      set(agg, row.Action, n + 1);
      return agg;
    }, {})
    .map(
      (value, key) => ({ id: key, counts: value }),
    )
    .value();
}

class GraphVis {
  constructor(nodes, links, selector) {
    this.selector = select(selector);
    this.svg = this.selector.append('svg')
      .attr('height', 400)
      .attr('width', '95%');
    this.nodes = nodes;
    this.links = links;
  }

  clear() {
    this.selector.selectAll('*').remove();
  }

  render() {
    const nodes = cloneDeep(this.nodes);
    const links = cloneDeep(this.links);
    const maxCounts = (m, n) => (m < n.counts ? n.counts : m);
    const maxCountsNodes = reduce(nodes, maxCounts, Number.NEGATIVE_INFINITY);
    const maxCountsLinks = reduce(links, maxCounts, Number.NEGATIVE_INFINITY);
    const labelNodes = map(nodes, n => extend({}, n, { label: n.id, id: `${n.id}-label` }));
    const labelLinks = map(nodes, n => extend({}, n, { label: true, source: n.id, target: `${n.id}-label` }));
    const simNodes = nodes.concat(labelNodes);
    const simLinks = links.concat(labelLinks);
    const middleSvg = this.svg.node().getBoundingClientRect().width / 2;

    const circs = this.svg.selectAll('circle').data(nodes)
      .enter()
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('fill', schemeSet1[3])
      .attr('r', d => 10 * d.counts / maxCountsNodes);

    const text = this.svg.selectAll('text').data(labelNodes)
      .enter()
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .text(d => d.label);

    const edges = this.svg.selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', d => interpolateOranges(d.counts / maxCountsLinks))
      .attr('stroke-width', d => 2 * d.counts / maxCountsLinks);

    this.simulation = forceSimulation(simNodes)
      .stop();

    const bodyForce = forceManyBody(simNodes)
      .strength(d => (d.label ? -13 : -500));

    const linkForce = forceLink(simLinks)
      .id(d => d.id)
      .distance(l => (l.label ? 2 : 20));

    this.simulation
      .force('charge', bodyForce)
      .force('link', linkForce)
      .force('center', forceCenter(middleSvg, 200));

    this.simulation.tick(400);

    text
      .attr('x', d => d.x)
      .attr('y', d => d.y);

    circs
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    edges
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
  }
}

export { GraphVis, generateNodes, generateLinks };
