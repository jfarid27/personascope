import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import LinkButton from '../LinkButton';
import LeadSignUpModal from '../LeadSignUpModal';
import './index.scss';

export default function View(props) {
  const { children, view } = props;
  const [modalOpen, toggleModal] = useState(false);
  return (
    <div className="view">
      <AppBar className="view-header" position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" />
          <Typography className="name" variant="h6" color="inherit">
            {'Personascope'}
          </Typography>
          <LinkButton className="menu-button" to="demo">Demo</LinkButton>
          <Button className="menu-button" onClick={() => toggleModal(true)}>Sign Up</Button>
          <LeadSignUpModal open={modalOpen} handleClose={() => toggleModal(false)} />
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
