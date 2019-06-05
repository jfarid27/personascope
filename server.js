const express = require('express');
const Mongo = require('mongodb');
const process = require('process');
const ProjectApp = require('./api/Project/router');
const RegistrationApp = require('./api/Registration/router');

const { MongoClient } = Mongo;

const app = express();
const port = process.env.PORT;
const dburl = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const dbclient = new MongoClient(dburl);

app.use(express.static('dist'));
app.use(express.json());

dbclient.connect((err) => {
  if (err) {
    return console.log('Failed to connect to db');
  }
  console.log('Connected successfully to db.');

  const db = dbclient.db(dbName);
  const registrationApp = RegistrationApp(db);
  const projectApp = ProjectApp(db);
  app.use(projectApp.url, projectApp.router);
  app.use(registrationApp.url, registrationApp.router);

  return app.listen(port, () => console.log(`Listening on port ${port}`));
});

app.use((req, res, next) => {
  console.log('Request recieved');
  return next();
});
