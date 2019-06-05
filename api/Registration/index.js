const _ = require('lodash');

const saveRegistration = db => (req, res) => {
  const data = _.get(req, ['body', 'email']);
  const inserted = {
    demo: true,
    email: data,
  };
  db.collection('registration')
    .insertOne(inserted, (err, resource) => {
      if (err) {
        return res
          .status(400)
          .send('Failed to save registration.');
      }
      return res.status(200).json({
        id: resource.insertedId,
      });
    });
};

const validateRegistration = (req, res, next) => {
  const data = _.get(req, 'body');
  const failed = !data.email;
  return failed
    ? res
      .status(400)
      .send('Invalid Registration Email.')
    : next();
};

module.exports = {
  validateRegistration,
  saveRegistration,
};
