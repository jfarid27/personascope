import React, { useRef, useEffect } from 'react';
import {
  chain,
  set,
  get,
} from 'lodash';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
  select,
  forceCenter,
  forceSimulation,
  forceLink,
  forceManyBody,
} from 'd3';

function generateNodes(rowData) {
  return new Promise(res => res(
    chain(rowData)
      .filter(hasActionAndSession)
      .reduce((agg, row) => {
        set(agg, row.Action, true);
        return agg;
      }, {})
      .map(
        (value, key) => ({ id: key }),
      )
      .value(),
  ));
}

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

function generateLinks(rowData) {
  return new Promise(res => res(
    chain(rowData)
      .filter(hasActionAndSession)
      .reduce(groupBySessionId, {})
      .map(buildLinks)
      .flatten()
      .map(idByLength)
      .value(),
  ));
}

class GraphVis {
  constructor(data, selector) {
    this.svg = select(selector).append('svg')
      .attr('height', 400)
      .attr('width', 800);
    this.project = data;
  }

  async render() {
    const nodes = await generateNodes(this.project.data);
    const links = await generateLinks(this.project.data);
    debugger

    const circs = this.svg.selectAll('circle').data(nodes)
      .enter()
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 5);

    const edges = this.svg.selectAll('line')
      .data(links)
      .enter().append('line')
      .style('stroke', 'black')
      .attr('stroke-width', () => 2);

    this.simulation = forceSimulation(nodes)
      .stop();
    this.simulation
      .force('charge', forceManyBody().strength(-100))
      .force('link', forceLink(links).id(d => d.id).distance(30))
      .force('center', forceCenter(400, 200));

    for (let i = 0; i < 40000; i += 1) {
      this.simulation.tick();
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
}

export default function DemoProjectVis(props) {
  const { project } = props;
  const demoVisRef = useRef(null);

  useEffect(() => {
    if (demoVisRef.current) {
      const g = new GraphVis(project, demoVisRef.current);
      setTimeout(g.render(), 3000);
    }
  });
  return (
    <div className="demo-project-vis">
      <Grid container spacing={24}>
        <Grid item xs={12} lg={12}>
          <Card className="demo-project-card">
            <CardContent>
              <form>
                <h1>Demo Project</h1>
                <label htmlFor="filter">
                  { 'Threshold' }
                  <input
                    id="filter"
                    type="number"
                    max="1"
                    min="0"
                  />
                </label>
              </form>
              <div
                className="demo-vis"
                ref={demoVisRef}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

DemoProjectVis.propTypes = {
  project: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
};

DemoProjectVis.defaultProps = {
  project: null,
};
