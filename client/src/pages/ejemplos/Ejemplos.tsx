import { useState } from 'react'
import EjemploDeEfecto from './EjemploDeEfecto'
import EjemploIntegrador from './EjemploIntegrador'
import EjemploIntegradorEffect from './EjemploIntegradorEffect'
import PrimerEjemploPage from './PrimerEjemploPage'
import SumadorPage from './SumadorPage'

enum RouteEnum {
  PRIMER_EJEMPLO = "page-priemer",
  SUMADOR = "page-sumador",
  EFECTO = "page-efecto",
  INTEGRADOR = "page-integrador",
  INTEGRADOR_EFFECT = "page-integrador-effect"
}


const Ejemplos = () => {
    const [route, setRoute] = useState<RouteEnum>(RouteEnum.PRIMER_EJEMPLO)

    return (
      <>
        <div>
          <button onClick={() => setRoute(RouteEnum.PRIMER_EJEMPLO)}>Primer Ejemplo</button>
          <button onClick={() => setRoute(RouteEnum.SUMADOR)}>Sumador</button>
          <button onClick={() => setRoute(RouteEnum.EFECTO)}>Efecto</button>
          <button onClick={() => setRoute(RouteEnum.INTEGRADOR)}>Ejemplo Integrador</button>
          <button onClick={() => setRoute(RouteEnum.INTEGRADOR_EFFECT)}>Ejemplo Integrador con Effect</button>
        </div>
        {route === RouteEnum.PRIMER_EJEMPLO && <PrimerEjemploPage />}
        {route === RouteEnum.SUMADOR && <SumadorPage />}
        {route === RouteEnum.EFECTO && <EjemploDeEfecto />}
        {route === RouteEnum.INTEGRADOR && <EjemploIntegrador />}
        {route === RouteEnum.INTEGRADOR_EFFECT && <EjemploIntegradorEffect />}
      </>
    )
}

export default Ejemplos