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
  const res = await axios.get(configs.SERVER_URL + '/clients' + `?system_id=${configs.SYSTEM_ID}`);
  return res.data;
};

exports.letThrough = async (user, queue) => {
  try {
    return axios.post(
      configs.SERVER_URL +
        `/clients/${user.id}/let_through?queue_id=${queue.id}&system_id=${configs.SYSTEM_ID}`
    );
  } catch (err) {
    console.error('ERROR :: letting through. ', err);
    throw new Error(err);
  }
};

exports.leaveQueue = async (user, queue) => {
  try {
    return axios.put(
      configs.SERVER_URL +
        `/clients/${user.id}/leave_queue?queue_id=${queue.id}&system_id=${configs.SYSTEM_ID}`
    );
  } catch {
    console.error('ERROR :: leave Queue. ', err);
    throw new Error(err);
  }
};

exports.registerUser = async (user) => {
  try {
    const formData = new FormData();
    formData.append('name', user.name);
    let res;
    if (user.type === configs.CLIENT_USER_TYPE) {
      res = await axios.post(
        configs.SERVER_URL + '/clients' + `?system_id=${configs.SYSTEM_ID}`,
        formData
      );
    } else {
      res = await axios.post(
        configs.SERVER_URL + '/owners' + `?system_id=${configs.SYSTEM_ID}`,
        formData
      );
    }
    return mapUserProperties(res.data);
  } catch (err) {
    console.error('ERROR :: Request register user. ', err);
    throw new Error(err);
  }
};

exports.logInUser = async (user) => {
  // /users?name=Juan&type=owner
  try {
    const formData = new FormData();
    formData.append('name', user.name);
    const type = user.type === configs.CLIENT_USER_TYPE ? 'client' : 'owner';
    const res = await axios.get(
      configs.SERVER_URL +
        `/users?name=${user.name}&type=${type}` +
        `&system_id=${configs.SYSTEM_ID}`
    );
    return mapUserProperties(res.data);
  } catch (err) {
    console.error('ERROR :: Request register user. ', err);
    throw new Error(err);
  }
};

exports.getSignedQueues = async (userId) => {
  try {
    return (
      await axios.get(
        configs.SERVER_URL + `/clients/${userId}/shop_queues` + `?system_id=${configs.SYSTEM_ID}`
      )
    ).data;
  } catch (err) {
    console.error('ERROR :: Error getting signed queues. ', err);
    throw new Error(err);
  }
};
