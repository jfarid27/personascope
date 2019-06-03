const express = require('express');
const {
  validateRegistration,
  saveRegistration,
} = require('.');

const RegistrationApp = (db) => {
  const registrationApp = {
    router: express.Router(),
    url: '/registration',
  };

  registrationApp.router.use(express.json());

  registrationApp.router.post('/',
    validateRegistration,
    saveRegistration(db));

  return registrationApp;
};

module.exports = RegistrationApp;
