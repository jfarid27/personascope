import API from '../API';

export default {
  create: async (data) => {
    const response = await API.post('/registration', data);
    return response;
  },
};
