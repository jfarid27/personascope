import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import csv from 'papaparse';
import View from '../../components/View';
import Project from '../../models/Project';
import DemoProjectVis from '../../components/DemoProjectVis';

import './index.scss';

const createProject = async (data, onLoad, onError) => {
  const reader = new FileReader();
  reader.onloadend = async () => {
    try {
      const parsed = csv.parse(reader.result, { header: true });
      const project = await Project.create(parsed.data);
      parsed.saved = project.id;
      onLoad(parsed);
    } catch (error) {
      onError(error);
      onLoad(null);
    }
  };

  reader.onerror = e => onError(e);

  reader.readAsText(data[0]);
};

function RequestProjectCreate() {
  return (
    <div className="request-project-create">
      <p>
        {
          `You currently have no project loaded. Start by creating
           a demo project above. You can visualize a workflow but you won't
           be able to save.`
        }
      </p>
    </div>
  );
}

function ErrorModal(props) {
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

export default function DemoProject() {
  const [error, onError] = useState(null);
  const [currentProject, onLoad] = useState(null);

  return (
    <View title="DemoProject" view="demo-project">
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card className="demo-project-card">
            <CardContent>
              <div className="lead">
                <h1 className="card-header">Projects</h1>
                <form className="upload-form">
                  <label htmlFor="raised-button-file">
                    <input
                      onChange={e => createProject(e.target.files, onLoad, onError)}
                      accept=".csv"
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      type="file"
                    />
                    <Button
                      variant="raised"
                      component="span"
                      className="upload-button"
                    >
                      New Project
                    </Button>
                    <ErrorModal
                      open={error}
                      handleClose={() => onError(null)}
                      dialogText="An error occurred loading your project."
                    />
                  </label>
                </form>
              </div>
              <p className="info-text">
                Create, Edit, and View Projects in demo mode. Projects
                will not be saved.
              </p>
              <p className="info-text">
                {
                  `Your project should be a csv file containing a header line with columns
                  'SessionId', 'Id', 'Date', and 'Action'.`
                }
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          { currentProject
            ? <DemoProjectVis project={currentProject} />
            : <RequestProjectCreate />
          }
        </Grid>
      </Grid>
    </View>
  );
}
