const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')

const { addUser, removeUser, getUser, getUserInRoom} = require('./users')
const {findPartnerSocket} = require('./helper')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)

const io = socketio(server, {
    cors: {
      origin: '*',
    }
  });

var queue = []

io.on('connection', (socket)=>{
    socket.on('join', ({name}, callback)=>{
        const {error ,user} = addUser({id: socket.id, name}) 
        console.log('adding user', user)
        if(error){
            return callback(error)
        }    

        if (queue.length > 0) {
            var partner= queue.pop();
            console.log(partner.id + ' was popped from queue\n');

            var room = socket.id + '#' + partner.id;
            console.log(room);
            if(getUser(partner.id)){

                console.log('par_id',getUser(partner.id))
                getUser(socket.id)['room']=room
                getUser(partner.id)['room']=room

                console.log(getUserInRoom('room: ',room))

                partner.join(room);
                socket.join(room);
                console.log(socket.id + ' and ' + partner.id + ' joined room ' + room);

                partner.emit('start chat', {/* 'name': socket.id,  */room});
                socket.emit('start chat', {/* 'name': partner.id,  */room});

                socket.emit('message', {user:'addmin', text: `${getUser(socket.id).name}, welcome to the room ${room}`})
                partner.emit('message', {user:'addmin', text: `${getUser(partner.id).name}, welcome to the room ${room}`})

                socket.broadcast.to(room).emit('message', {user:'admin', text: `${getUser(socket.id).name}, has joined!`})
                partner.broadcast.to(room).emit('message', {user:'admin', text: `${getUser(partner.id).name}, has joined!`})
            }else{
                console.log('fail_bypushing: ', queue.length)
                partner.emit('message', {user:'addmin', text: `${getUser(partner.id)} is not existed, please wait for other to come`})
            }

            io.to(room).emit('roomData', {room, user:getUserInRoom(room)})
        /* callback() */
        } else {
            queue.push(socket);

            console.log(socket.id + ' was pushed to queue\n');
            console.log('bypushing: ', queue.length)
        }


       /*  socket.emit('message', {user:'addmin', text: `${user.name}, welcome to the room ${user.room}`}) */
      /*   socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name}, has joined!`}) */

      /*   socket.join(user.room) */

        /* io.to(user.room).emit('roomData', {room:user.room, user:getUserInRoom(user.room)})
        callback() */
    })

    socket.on('sendMessage', (message, callback)=>{
        
        console.log(`receive message <${message}> from frontend`)
        const user = getUser(socket.id)
        console.log(`send message to room ${user.room}`)
        io.to(user.room).emit('message', {user: user.name, text: message})
        io.to(user.room).emit('roomData', {room: user.room, user:getUserInRoom(user.room)})

        callback()
    })

    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id);

        if(user){
            console.log('disconnect: ',user)
            io.to(user.room).emit('message', {user:'admin', text:`${user.name} has left`})
            console.log('disconnect_queue: ', queue.map(s => s.id))
        }
    })
})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))