const { addUser, removeUser, getUser, getUserInRoom} = require('./users')

var queue = []

var findPartnerSocket = (socket) => {
    if (queue.length > 0) {
        var partner= queue.pop();
        console.log(partner.id + ' was popped from queue\n');
        log(queue);
        var room = socket.id + '#' + partner.id;
        partner.join(room);
        socket.join(room);
        console.log(socket.id + ' and ' + partner.id + ' joined room ' + room);
        partner.emit('chat start', {'name': socket.id, 'room':room});
        socket.emit('chat start', {'name': partner.id, 'room':room});
    } else {
        queue.push(socket);
        console.log(socket.id + ' was pushed to queue\n');
        log(queue);
    }
};


module.exports = {findPartnerSocket}