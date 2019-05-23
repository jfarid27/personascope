import React from 'react';
import Button from '@material-ui/core/Button';
import LinkButton from '../../components/LinkButton';
import View from '../../components/View';
import './index.scss';

const minorText = `
  Gain understanding of your users using data-driven insights. Validate your
  personas. Challenge your assumptions. Drive your designs.
`;

export default function Home() {
  return (
    <View title="Home" view="home">
      <div className="header">
        <h1 className="callout-text">Your users, magnified.</h1>
        <span className="minor-text">{minorText}</span>
        <div className="action">
          <LinkButton to="demo">Demo</LinkButton>
          <Button color="inherit">Sign Up</Button>
        </div>
      </div>
    </View>
  );
}
