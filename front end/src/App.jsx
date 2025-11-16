import './App.css'
import NoteComponent from './component/notes/NoteComponent';
import UserDashboard from './dashboard/UserDashboard';
import UserLoginComponent from './user/UserLoginComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <div className='flex flex-col justify-evenly gap-5'>
      <h2 className='text-2xl'>Welcome to React</h2>
      <Router>
        <Routes>
          <Route path='/' element={<UserLoginComponent />} ></Route>
          <Route path='/dashboard' element={<UserDashboard />} ></Route>
        </Routes>
      </Router>

      
  

    </div>
  )
}

export default App
