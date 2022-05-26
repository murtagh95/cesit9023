import { Link, Route, Routes } from 'react-router-dom'
import Ejemplos from './pages/ejemplos/Ejemplos'
import HomePage from './pages/HomePage'

const App = () => {

  return (
    <>
      <h1>CESIT 2022</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/ejemplos">Ejemplos</Link>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ejemplos" element={<Ejemplos />} />
      </Routes>
    </>
  )
  
}

export default App