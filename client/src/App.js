import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';

//import components
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'

const App = () => {
  return(
    <div>
      <BrowserRouter>
        <Routes>

        
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={< Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
