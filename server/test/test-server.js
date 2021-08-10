var should = require('should');
var io = require('socket.io-client'),
    server = require('../index.js');



var socketURL = 'http://localhost:5000';

var options ={
  transports: ['websocket'],
  'force new connection': true
};

var chatUser1 = {'name':'tom'};
var chatUser2 = {'name':'sally'};
var chatUser3 = {'name':'dana'};

describe("Chat Server",function(){

    /* Test 1 - A Single User */
    it('one User connects to server',function(done){
      var client = io.connect(socketURL, options);
      var room =''
  
      client.on('connect',function(data){
        client.emit('join', chatUser1);
      });

      client.on('start chat',function(sent_room){
        room = sent_room.room
      })
  
      client.on('message',function(object){
        object.text.should.be.type('string');
        object.text.should.equal(chatUser1.name + `, welcome to the room ${room}`);
      });
      client.disconnect()
      done()
    });

    /* Test 2 - Two Users */
    it('Should broadcast new user to all users', function(done){
        var client1 = io.connect(socketURL, options);

        client1.on('connect', function(data){
            client1.emit('join', chatUser1);

            /* Since first client is connected, we connect the second client. */
            var client2 = io.connect(socketURL, options);

            var room =''

            client2.on('connect', function(data){
                client2.emit('join', chatUser2);
            });

            client2.on('start chat',function(sent_room){
                room = sent_room.room
            })
            
            client2.on('message',function(object){
                object.text.should.be.type('string');
                object.text.should.equal(chatUser2.name + `, welcome to the room ${room}`);
                client2.disconnect();
            });
        });
        done()

    /*     var numUsers = 0;
        client1.on('new user', function(usersName){
        numUsers += 1;

        if(numUsers === 2){
            usersName.should.equal(chatUser2.name + " has joined.");
            client1.disconnect();
            done();
        }
        }); */
    });
});