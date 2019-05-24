const _ = require('lodash');

const expectedFields = ['SessionId', 'Id', 'Date', 'Action'];

const filterRequiredFields = data => _.map(data, row => _.pick(row, expectedFields));

/**
 * Get request body and checks if each data is less than a certain length.
 */
const validateDemoProjectLength = (req, res, next) => {
  const data = _.get(req, 'body');
  const failed = data.length > 400;
  return failed
    ? res
      .status(400)
      .send('Invalid Project size. Demo data can only have length 400.')
    : next();
};

/**
 * Get request body and checks if each row has required fields.
 */
const validateDemoProject = (req, res, next) => {
  const data = _.get(req, 'body');
  const failed = !_.every(
    data,
    row => _.map(
      expectedFields,
      key => _.includes(_.keys(row), key),
    ),
  );

  return failed
    ? res
      .status(400)
      .send('Invalid Project Data. Missing required field.')
    : next();
};

/**
 * Save request body in projects collection.
 */
const saveDemoProjectData = db => (req, res) => {
  const data = _.get(req, 'body');
  const inserted = {
    data: filterRequiredFields(data),
    demo: true,
  };
  db.collection('demo')
    .insertOne(inserted, (err, resource) => {
      if (err) {
        return res
          .status(400)
          .send('Failed to save project.');
      }
      return res.status(200).json({
        id: resource.insertedId,
      });
    });
};

module.exports = {
  validateDemoProject,
  validateDemoProjectLength,
  saveDemoProjectData,
};
