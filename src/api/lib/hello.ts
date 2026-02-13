import api from '../api';

const hello = async () => {
  try {
    const res = await api.get('/');
    return res.data;
  } catch (e) {
    throw e;
  }
};

export { hello };
