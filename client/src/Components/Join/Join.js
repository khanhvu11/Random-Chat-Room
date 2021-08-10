import React, {useState} from 'react'
import {Link} from 'react-router-dom'
/* import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography' */

import './Join.css'

function Join() {
    const [name, setName] = useState('');
/*     const [room, setRoom] = useState(''); */

    return (
    /*     <Container component="main" maxWidth="xs">
            <div className="paper">
                <Typography component="h1" variant="h5">
                    Welcome to Random Chatroom
                </Typography>
                <form className="form" noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Username"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={'/chat?name={name}&room{room}'}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit"
                        >
                            Sign In
                        </Button>
                    </Link>
                </form>
            </div>
        </Container> */

        <div className="joinOuterContainer">
            <div className ="joinInnerContainer">
                <h1 className="heading">Welcome to Random Chat</h1>
                <div><input placeholder="Your Name" className="joinInput" type='text' onChange={(event)=> setName(event.target.value)} />

                {/* <div><input placeholder="" className="joinInput mt-20" type='text' onChange={(event)=> setRoom(event.target.value)} /></div> */}

                <Link onClick={event => (!name) ? event.preventDefault() : null} to={`/chat?name=${name}`}>
                    <button className="button mt-20" type="submit">Start Chat</button>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Join
