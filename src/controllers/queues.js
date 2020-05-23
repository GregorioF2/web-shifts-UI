const axios = require('axios');


const queues = [

];
let id = 0;

exports.getUserQueues = async (user) => {
    return queues;
}

exports.createQueue = async (user, queue) => {
    id += 1;
    queue.id = id;
    
    const currentAmmountOfClients = Math.floor((queue.limit) * Math.random());
    const usersIds = [];
    for(let id = 1; id<= currentAmmountOfClients; id+=1) {
        usersIds.push(id);
    }
    queue.users = usersIds;
    queues.push(queue);
    return queues;
}

exports.getImage = async() => {
    const res = await axios.get('https://via.placeholder.com/150');
    console.log('res: ');
    
}