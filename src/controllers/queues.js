const queues = [

];
let id = 0;

exports.getUserQueues = async (user) => {
    return queues;
}

exports.createQueue = async (user, queue) => {
    id += 1;
    queue.id = id;
    queues.push(queue);
    return queues;
}