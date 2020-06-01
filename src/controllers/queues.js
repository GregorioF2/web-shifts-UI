const axios = require('axios');
const configs = require('../configs');

exports.getQueues = async () => {
  try {
    const res = await axios.get(configs.SERVER_URL + '/queues');
    return res.data;
  } catch (err) {
    console.error('ERROR :: error in get queues');
    throw new Error(err);
  }
};

exports.enqueueClient = async (user, queue) => {
    console.log('tuvieja');
  try {
    await axios.post(configs.SERVER_URL + `/queues/${queue.id}?client_id=${user.id}`);
  } catch (err) {
    console.error('ERROR :: error in enque client');
    throw new Error(err);
  }
};

exports.getCreatedUserQueues = async (user) => {
  try {
    const res = await axios.get(configs.SERVER_URL + '/queues');
    return res.data;
  } catch (err) {
    console.error('ERROR :: error in get user created queues');
    throw new Error(err);
  }
};

exports.createQueue = async (user, queue) => {
  try {
    const formData = new FormData();
    formData.append('name', queue.name);
    formData.append('capacity', queue.capacity);
    const res = await axios.post(configs.SERVER_URL + '/queues', formData);
    return res.data;
  } catch (err) {
    console.error('ERROR :: error in get created queue');
    throw new Error(err);
  }
};

exports.getImage = async () => {
  const res = await axios.get('https://via.placeholder.com/150');
  console.log('res: ');
};
