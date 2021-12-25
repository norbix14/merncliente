import { useContext, useEffect } from 'react'
import AlertaContext from '../../context/alertas/alertaContext'
import ProyectoContext from '../../context/proyectos/proyectoContext'
import Proyecto from './Proyecto'
import { animateClass } from '../helpers/animateClasses'
import ErrorDiv from '../error/Error'
import AuthContext from '../../context/auth/authContext'

const ListadoProyectos = () => {
  const alertaContext = useContext(AlertaContext)
  const proyectosContext = useContext(ProyectoContext)
  const authContext = useContext(AuthContext)

  const { alerta, mostrarAlerta } = alertaContext
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext
  const { autenticado } = authContext

  useEffect(() => {
    if (mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria)
    if (autenticado) {
      obtenerProyectos()
    }
  }, [mensaje])

  if (proyectos.length <= 0) {
    return (
      <h3 className={animateClass('fadeInLeft')}>
        Comienza a crear proyectos!
      </h3>
    )
  }

  return (
    <>
      {alerta && <ErrorDiv alerta={alerta} />}
      <div className={animateClass('fadeInLeft') + 'proyectos'}>
        <h2>Tus proyectos creados</h2>
        <ul className="listado-proyectos">
          {proyectos.length > 0 &&
            proyectos.map((proyecto) => (
              <Proyecto key={proyecto._id} proyecto={proyecto} />
            ))}
        </ul>
      </div>
    </>
  )
}

export default ListadoProyectos
