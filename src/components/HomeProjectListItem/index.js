import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { ProjectStatus } from '../../constants/App';
import './index.scss';

export default function HomeProjectListItem(props) {
  const { name, status, projectId } = props;
  return (
    <Paper className="home-project-list-item">
      <Link to={`project/${projectId}`}>
        <div className="ok-card-header">
          <span className="ok-callout-text">
            { name }
          </span>
        </div>
        <div className="ok-card-body">
          <span className="ok-detail-text">
            { status }
          </span>
          <span>
            { projectId }
          </span>
        </div>
      </Link>
    </Paper>
  );
}

HomeProjectListItem.defaultProps = {
  name: 'A project',
  status: ProjectStatus.pending,
};

HomeProjectListItem.propTypes = {
  name: PropTypes.string,
  projectId: PropTypes.string.isRequired,
  status: PropTypes.string,
};
