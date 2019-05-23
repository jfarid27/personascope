import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import './index.scss';

export default function View(props) {
  const { children, view } = props;
  return (
    <div className="view">
      <AppBar className="view-header" position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" />
          <Typography className="name" variant="h6" color="inherit">
            {'Personascope'}
          </Typography>
          <Button color="inherit">Demo</Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
      <div className={`view-body ${view}`}>
        { children }
      </div>
    </div>
  );
}

View.propTypes = {
  children: PropTypes.element.isRequired,
  view: PropTypes.string.isRequired,
};
