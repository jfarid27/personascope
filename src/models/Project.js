import API from '../API';

export default {
  create: data => API.post('/project/demo', data),
};
