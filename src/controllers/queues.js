const axios = require('axios');
const configs = require('../configs');

exports.getQueues = async () => {
  try {
    const res = await axios.get(configs.SERVER_URL + '/queues' + `?system_id=${configs.SYSTEM_ID}`);
    return res.data.map(queue => {queue.source_id = configs.SYSTEM_ID; return queue;})
    return res.data;
  } catch (err) {
    console.error('ERROR :: error in get queues');
    throw new Error(err);
  }
};

exports.serveNext = async (queueId) => {
  return axios.put(
    configs.SERVER_URL + `/queues/${queueId}/serve_next` + `?system_id=${configs.SYSTEM_ID}`
  );
};

exports.enqueueClient = async (user, queue) => {
  try {
    await axios.post(
      configs.SERVER_URL +
        `/queues/${queue.id}?client_id=${user.id}` +
        `?system_id=${configs.SYSTEM_ID}`
    );
  } catch (err) {
    console.error('ERROR :: error in enque client');
    throw new Error(err);
  }
};

exports.getCreatedUserQueues = async (user) => {
  try {
    console.log('getCreatedUserQueues::user: ', JSON.stringify(user, null, ' '));
    const res = await axios.get(
      configs.SERVER_URL + `/owners/${user.id}` + `?system_id=${configs.SYSTEM_ID}`
    );
    return res.data;
  } catch (err) {
    console.error('ERROR :: error in get user created queues');
    throw new Error(err);
  }
};

exports.createQueue = async (user, queue) => {
  try {
    const formData = new FormData();
    console.log('queue: ', queue);
    formData.append('name', queue.name);
    formData.append('capacity', queue.capacity);
    formData.append('source_id', configs.SYSTEM_ID);
    formData.append('longitude', queue.longitude);
    formData.append('latitude', queue.latitude);
    formData.append('owner_id', user.id);
    formData.append('description', queue.description);

    console.log('Forma Data: ', JSON.stringify(formData, null, ' '));

    const res = await axios.post(
      configs.SERVER_URL + '/queues' + `?system_id=${configs.SYSTEM_ID}`,
      formData
    );
    return res.data;
  } catch (err) {
    console.error('Error: creating queue. ', err);
    throw new Error(err);
  }
};

exports.getImage = async () => {
  const res = await axios.get('https://via.placeholder.com/150');
  console.log('res: ');
};

exports.removeQueue = async (queue) => {
  try {
    await axios.delete(
      configs.SERVER_URL + `/queues/${queue.id}` + `?system_id=${configs.SYSTEM_ID}`
    );
  } catch (err) {
    console.error('Error: deleting queue. ', err);
    throw new Error(err);
  }
};
