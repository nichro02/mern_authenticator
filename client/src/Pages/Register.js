import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css';

function Register() {
  //useState to capture data entered into form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useNavigate()

  //handle user signup
  async function registerUser(event) {
    event.preventDefault()
    
    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    const data = await response.json()
    console.log(data)

    if(data.status==='ok'){
        history('/login')
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type='text'
          placeholder='Name'
        />
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
          type='submit' value='Sign Up'
        />
      </form>
    </div>
  );
}

export default Register;