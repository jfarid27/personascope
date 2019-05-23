import API from '../API';

const project = {
  owner: 'you',
  id: '1',
  data: {
    directed: false,
    edges: [
      { index: '1', connects: [1, 2] },
    ],
    nodes: [
      { name: 'foo', index: 1 },
      { name: 'bar', index: 2 },
    ],
  },
};

export default {
  create: async (data) => {
    await API.post('/project/demo', data);
    return project;
  },
};
