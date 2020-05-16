import React, {useState} from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Jokes from './components/Jokes'

function App() {
  const [message, setMessage] = useState({})
  return (
    <div className="App">
      <Route exact path="/" render={props => <Login {...props} message={message}/>} />
      <Route exact path="/register" render={props => <Register {...props} setMessage={setMessage}/>} />
      <Route exact path="/jokes" render={props => <Users {...props} />} />
    </div>
}

export default App;
