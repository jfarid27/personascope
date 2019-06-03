import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Registration from '../models/Registration';

const dialogText = `
  This application is currently in beta. To be alerted when it is released,
  please sign up below.
`;

const signupFailText = `
  An error occurred. Please try again.
`;

const handleSubmit = (handleClose, signupFail, email) => async () => {
  if (!email) {
    signupFail('Invalid email.');
    return;
  }
  try {
    await Registration.create({ email });
    handleClose();
  } catch (err) {
    signupFail(err);
  }
};

export default function LeadSignUpModal(props) {
  const { open, handleClose } = props;
  const [email, updateEmail] = useState(null);
  const [signupFailed, signupFail] = useState(null);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">Sign Up</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div>
            <p>{dialogText}</p>
          </div>
          <form>
            <TextField
              id="beta-email"
              label="Email"
              error={signupFailed}
              value={email}
              onChange={e => updateEmail(e.target.value)}
              helperText={signupFailed ? signupFailText : ''}
              type="email"
              margin="normal"
            />
          </form>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit(handleClose, signupFail, email)}
          color="primary"
          autoFocus
        >
         Submit
        </Button>
        <Button onClick={handleClose}>
         Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

LeadSignUpModal.propTypes = {
  open: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
};

LeadSignUpModal.defaultProps = {
  open: null,
};
