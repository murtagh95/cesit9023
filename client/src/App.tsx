import React from 'react'
import EjemploDeEfecto from './pages/ejemplos/EjemploDeEfecto'
import EjemploIntegrador from './pages/ejemplos/EjemploIntegrador'
import PrimerEjemploPage from './pages/ejemplos/PrimerEjemploPage'
import SumadorPage from './pages/ejemplos/SumadorPage'

const App = () => {

    // acá crean el state para routear

  return (
    <>
      <div>
        <button>Primer Ejemplo</button>
        <button>Sumador</button>
        <button>Efecto</button>
        <button>Ejemplo Integrador</button>
      </div>
      {/* <PrimerEjemploPage /> */}
      {/* <SumadorPage /> */}
      {/* <EjemploDeEfecto /> */}
      <EjemploIntegrador />
    </>
  )
}

export default App