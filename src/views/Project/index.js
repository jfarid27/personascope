import React from 'react';
import Project from '../../models/Project';

const projectMock = { id: 1 };

export default class ProjectView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {
    this.setState({ project: Project.fromAPI(projectMock), loaded: true });
  }

  render() {
    const { project, loaded } = this.state;
    return (
      <div id="view-project" className="view project">
        {
          loaded
            ? (
              <div>
                { project.id }
              </div>
            )
            : <div> Not Loaded </div>
        }
      </div>
    );
  }
}
