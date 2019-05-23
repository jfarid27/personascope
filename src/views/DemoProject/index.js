import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
                <h1 className="card-header">Project</h1>
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
                    {
                      error
                        ? 'Has error'
                        : ''
                    }
                  </label>
                </form>
              </div>
              <p className="info-text">
                Create, Edit, and View Projects in demo mode. Projects
                will not be saved.
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
