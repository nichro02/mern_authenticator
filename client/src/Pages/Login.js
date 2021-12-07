import { useState } from 'react'
import '../App.css';

function Login() {
    //useState to capture data entered into form
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    //handle user login
    async function loginUser(event) {
      event.preventDefault()
      //send data to database
      const response = await fetch('http://localhost:1337/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const data = await response.json()
      console.log(data)
      if(data.user){
        console.log('Login successful')
        localStorage.setItem('token', data.user)
        window.location.href = '/dashboard'
      } else {
        alert('Please check your username and password')
      }
    }
  
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={loginUser}>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type='email'
            placeholder='Email'
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
          />
          <input
            type='submit' value='Log In'
          />
        </form>
      </div>
    );
  }
  
  export default Login;