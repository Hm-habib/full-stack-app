import './App.css'
import NoteComponent from './component/notes/NoteComponent';
import UserLoginComponent from './user/UserLoginComponent';

function App() {
  

  return (
    <div className='flex flex-col justify-evenly gap-5'>
      <h1>Welcome to React</h1>
      <UserLoginComponent />

    </div>
  )
}

export default App
