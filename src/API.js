import axios from 'axios';
import { extend } from 'lodash';

export default {
  post: (url, data, options) => {
    const config = extend(
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        url,
        data,
      },
      options,
    );
    return axios(config);
  },
};
