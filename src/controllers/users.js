exports.getUsers = async () => {
  return [
    {type: 'propietario', id: 1, name: 'juan'},
    {type: 'propietario', id: 2, name: 'domingo'},
    {type: 'cliente', id: 3, name: 'peron'}
  ];
};

let id = 0;
exports.registerUser = (user) => {
  return new Promise((resolve, reject) => {
    id+=1;
    setTimeout(() => {
      console.log('REGISTER USER METHOD');
      return resolve({
        name:  user.name,
        id: id,
        type: user.type
      });
    }, 500);
  });
};
