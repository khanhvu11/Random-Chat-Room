import React from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Join from './Components/Join/Join'
import Chat from './Components/Chat/Chat'

function App() {
    return (
        <Router>
            <Route path="/" exact component={Join}/>
            <Route path="/chat" exact component={Chat}/>
        </Router>
    )
}

export default App
