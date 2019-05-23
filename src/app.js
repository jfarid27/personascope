import React, { createElement, Component } from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { map } from 'lodash';
import Routes from './routes';

import './app.scss';

const e = createElement;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="v-braid-app">
        <Router>
          {
            map(Routes, route => (
              <Route
                key={route.url}
                exact
                path={route.url}
                component={route.component}
              />
            ))
          }
        </Router>
      </div>
    );
  }
}

const domContainer = document.querySelector('#__root__');
render(e(App), domContainer);
