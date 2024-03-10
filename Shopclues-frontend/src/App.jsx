import { Outlet } from 'react-router-dom'
import './App.css'
import MenuBar from './components/MenuBar'

function App() {

  return (
    <>
      <MenuBar />
      <Outlet />
    </>
  )
}

export default App
