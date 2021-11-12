import { useState } from 'react'
import './App.css';

function App() {
  //useState to capture data entered into form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h1>Register</h1>
      <form>
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
      </form>
    </div>
  );
}

export default App;
