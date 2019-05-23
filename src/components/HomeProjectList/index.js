import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import HomeProjectListItem from '../HomeProjectListItem';
import Project from '../../models/Project';

export default class HomeProjectList extends React.Component {
  static defaultProps = {
    projects: [],
  }

  static propTypes = {
    projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)),
  }

  render() {
    const { projects } = this.props;
    return (
      <div className="home-project-list">
        {
        map(projects, project => (
          <HomeProjectListItem
            key={project.id}
            projectId={project.id}
            name={project.name}
            status={project.status}
          />
        ))
        }
      </div>
    );
  }
}
