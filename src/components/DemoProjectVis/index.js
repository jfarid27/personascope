import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TransitionGraphDetails from '../TransitionGraphDetails';
import { GraphVis, generateNodes, generateLinks } from '../InsightGraph';

export default function DemoProjectVis(props) {
  const { project } = props;
  const demoVisRef = useRef(null);
  const nodes = generateNodes(project.data);
  const links = generateLinks(project.data);

  useEffect(() => {
    const g = new GraphVis(nodes, links, demoVisRef.current);
    setTimeout(() => {
      g.render();
    }, 300);
    return () => g.clear();
  });

  return (
    <div className="demo-project-vis">
      <Grid container spacing={24}>
        <Grid item xs={12} lg={6}>
          <Card className="demo-project-card">
            <CardContent>
              <h1>Transition Graph</h1>
              <div
                className="demo-vis"
                ref={demoVisRef}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card className="demo-project-card">
            <CardContent>
              <TransitionGraphDetails
                project={project}
                nodes={nodes}
                links={links}
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
