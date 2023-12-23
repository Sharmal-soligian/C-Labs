import { Route, Routes } from 'react-router-dom'
import './App.css'
import Segment from './pages/Segment'

function App() {

  return (
    <>
      <Routes>
        <Route index path='/' element={ <Segment /> } />
      </Routes>
    </>
  )
}

export default App
