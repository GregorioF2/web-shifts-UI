const axios = require('axios');
const configs = require('../configs');


exports.getQueues = async () => {
    try {
        const res = await axios.get(configs.SERVER_URL + '/queues');
        return res.data;
    } catch(err) {
        throw new Error(err);
    };
}

exports.getCreatedUserQueues = async (user) => {
    try {
        const res = await axios.get(configs.SERVER_URL + '/queues');
        return res.data;
    } catch(err) {
        throw new Error(err);
    };
}

exports.createQueue = async (user, queue) => {
    try {
        const formData = new FormData();
        formData.append('name', queue.name);
        formData.append('capacity', queue.capacity);
        const res = await axios.post(configs.SERVER_URL + '/queues', formData);
        return res.data;
    } catch(err) {
        throw new Error(err);
    };
}

exports.getImage = async() => {
    const res = await axios.get('https://via.placeholder.com/150');
    console.log('res: ');
    
}
