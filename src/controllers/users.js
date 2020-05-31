const configs = require('../configs');
const axios = require('axios');

const mapUserProperties = (user) => {
  return {
    id: user.id,
    name: user.name,
    type: user.type === 'Client' ? configs.CLIENT_USER_TYPE : configs.OWNER_USER_TYPE,
    shopQueues: user.shop_queues || [] 
  };
};

exports.getUsers = async () => {
  return [
    {type: 'propietario', id: 1, name: 'juan'},
    {type: 'propietario', id: 2, name: 'domingo'},
    {type: 'cliente', id: 3, name: 'peron'}
  ];
};

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
