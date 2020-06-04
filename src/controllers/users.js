const configs = require('../configs');
const axios = require('axios');

const mapUserProperties = (user) => {
  return {
    id: user.id,
    name: user.name,
    type: user.type === 'client' ? configs.CLIENT_USER_TYPE : configs.OWNER_USER_TYPE,
    shopQueues: user.shop_queues || [] 
  };
};

exports.getUsers = async () => {
  const res = await(axios.get(configs.SERVER_URL + '/clients'));
  return res.data
};

exports.letThrough = async (user, queue) => {
  await axios.post(configs.SERVER_URL + `/clients/${user.id}/let_through?queue_id=${queue.id}`);
  return;
}

exports.registerUser = async (user) => {
  try {
    const formData = new FormData();
    formData.append('name', user.name);
    let res;
    if (user.type === configs.CLIENT_USER_TYPE) {
      res = (await axios.post(configs.SERVER_URL + '/clients', formData));
    } else {
      res = (await axios.post(configs.SERVER_URL + '/owners', formData));
    }
    return mapUserProperties(res.data)
  } catch (err) {
    console.error('ERROR :: Request register user');
    throw new Error(err);
  }
};

exports.getSignedQueues = async (userId) => {
  try {
    return (await axios.get(configs.SERVER_URL + `/clients/${userId}/shop_queues`)).data;
  } catch(err) {
    console.error('ERROR :: Error getting signed queues');
    throw new Error(err);
  }
}
