import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';

import {/* Link, */ useHistory} from 'react-router-dom'

import './Chat.css'

let socket

function Chat() {
    const history = useHistory()
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');
    const ENDPOINT =  'aad488ac282b64639be3d059a37e2b06-1578622897.eu-central-1.elb.amazonaws.com'

    useEffect(()=>{
        const {name} = queryString.parse(window.location.search)

        socket = io(ENDPOINT)

        setName(name)
        
        socket.emit('join', {name}, (error)=>{
            if(error){
                alert(error)
                history.push({
                    pathname: '/'
                  });
      
            }
        })

        return () =>{
            /* socket.emit('disconnect', () => {
                history.push({
                    pathname: '/'
                  });
      
            }) */

            socket.off()
        }
    }, [ENDPOINT, history])

    useEffect(()=> {
        socket.on('start chat', ({room})=>{
            /* console.log('message sent back to client') */
            setRoom(room)
            
        })
    },[])

    useEffect(()=>{
        socket.on('message', (message)=>{
            console.log('message sent back to client')
            setMessages([...messages, message])
            
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    },[messages])

    const sendMessage = (e) => {
        console.log('press ENter')
        e.preventDefault()

        if(message){
            console.log(message)
            socket.emit('sendMessage', message, ()=>setMessage(''))
        }
    }

    console.log(message, messages)

    return (
        
        <div className='outerContainer'>
            <TextContainer users={users}/>
            <div className='container'>
                <InfoBar room={room}/>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            {/* <Link onClick={event => (!name) ? event.preventDefault() : null} to={`/chat?name=${name}`}>
                <button className='changeRoom' type='button'>Change Room</button>
            </Link> */}
        </div>
    )
}

export default Chat
