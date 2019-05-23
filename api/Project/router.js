const express = require('express');
const {
  validateDemoProject,
  saveDemoProjectData,
  validateDemoProjectLength,
} = require('.');

const ProjectApp = (db) => {
  const projectApp = {
    router: express.Router(),
    url: '/project',
  };

  projectApp.router.use(express.json());

  projectApp.router.post('/demo',
    validateDemoProject,
    validateDemoProjectLength,
    saveDemoProjectData(db));

  return projectApp;
};

module.exports = ProjectApp;
