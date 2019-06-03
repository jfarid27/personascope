import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function ErrorModal(props) {
  const { open, handleClose, dialogText } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">Error</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
         Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ErrorModal.propTypes = {
  open: PropTypes.object,
  dialogText: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

ErrorModal.defaultProps = {
  open: null,
};
