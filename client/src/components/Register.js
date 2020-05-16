import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = (props) => {

    const [creds, setCreds] = useState({})

    const handle = (e) => {
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        })
    }

    const addUser = (e) =>{
        e.preventDefault()
        axios
            .post(`http://localhost:3300/api/auth/register`, creds)
            .then((res) => {
                props.setMessage({
                    registered: "Registration was sucessful. Please log in"
                })
                props.history.push("/")
            })
            .catch((err) => {
                console.log(err)
                props.setMessage({
                    registered: "Registration was not sucessful. Please try again"
                })
                props.history.push("/")
            })
    }

  
    return (
        <div>
            <form onSubmit={addUser}>
                <input type="text" name="username" placeholder="username" onChange={handle}/>
                <input type="password" name="password" placeholder="password" onChange={handle}/>
                <input type="text" name="department" placeholder="department" onChange={handle}/>
                <button type="submit">Register</button>
            </form>
            
            <Link to="/"> Back to Login</Link>
           
            
        </div>
    )

}

export default Register