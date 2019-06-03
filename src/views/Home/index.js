import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LinkButton from '../../components/LinkButton';
import View from '../../components/View';
import LeadSignUpModal from '../../components/LeadSignUpModal';
import './index.scss';

const minorText = `
  Gain understanding of your users using data-driven insights. Validate your
  personas. Challenge your assumptions. Drive your designs.
`;
const designText = `
  Design is a one-way street. Leverage data analytics to help drive your
  designs to something better. Are there personas using your application
  that you are not aware of?
  Could you improve a bottleneck by adding a new link? Personascope
  can help you make data-driven decisions. Don't just think about
  what your users are doing, listen to them.
`;

function LeadSplash() {
  const [modalOpen, toggleModal] = useState(false);
  return (
    <div className="header">
      <h1 className="callout-text">Your users, magnified.</h1>
      <span className="minor-text">{minorText}</span>
      <div className="action">
        <LinkButton to="demo">Demo</LinkButton>
        <Button onClick={() => toggleModal(true)}>Sign Up</Button>
      </div>
      <LeadSignUpModal open={modalOpen} handleClose={() => toggleModal(false)} />
    </div>
  );
}

function AppDetails() {
  return (
    <div className="app-details">
      <Grid container spacing={24}>
        <Grid item xs={12} lg={12}>
          <h1 className="callout-text">Use event logs to drive application design.</h1>
          <p className="detail-text">Personascope leverages your existing event logs to help drive application design.</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="demo-project-card">
            <CardContent>
              <h1 className="lead-text">Visualize</h1>
              <p>
                Use Personascope to see what users do on your application. What steps
                are they more likely to take next? What workflows do they use? Instead
                of designing personas, let your users drive design. Not the other way around.
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="demo-project-card">
            <CardContent>
              <h1 className="lead-text">Analyze</h1>
              <p>
                Personascope can help identify bottlenecks in your workflow. Did you
                expect a user to submit a form? Navigate to a different page? Are they?
                Workflows can be designed, but users are the ultimate judge in what
                your application does. Leverage what your users are telling you.
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="demo-project-card">
            <CardContent>
              <h1 className="lead-text">Design</h1>
              <p>{designText}</p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

function TryIt() {
  const tryText = "Personascope is in beta. Try a demo while we're building.";
  return (
    <div className="try-details">
      <Grid container spacing={24}>
        <Grid item xs={12} lg={12}>
          <h1 className="callout-text">Test Drive.</h1>
          <p>{tryText}</p>
          <LinkButton to="demo">Start Now</LinkButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default function Home() {
  return (
    <View title="Home" view="home">
      <LeadSplash />
      <AppDetails />
      <TryIt />
    </View>
  );
}
