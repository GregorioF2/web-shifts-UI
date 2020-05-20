exports.getUsers = async () => {
  return [
    {type: 'propietario', id: 1, name: 'juan'},
    {type: 'propietario', id: 2, name: 'domingo'},
    {type: 'cliente', id: 3, name: 'peron'}
  ];
};

exports.registerUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('REGISTER USER METHOD');
      return resolve();
    }, 500);
  });
};
