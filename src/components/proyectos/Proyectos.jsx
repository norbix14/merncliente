import { useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import Sidebar from '../layout/Sidebar'
import Barra from '../layout/Barra'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'

const Proyectos = () => {
  const authContext = useContext(AuthContext)
  const { autenticado, getDatosUsuarioAutenticado } = authContext

  useEffect(() => {
    if (autenticado) {
      getDatosUsuarioAutenticado()
    }
  }, [])

  if (!autenticado) {
    return <Navigate to="/" />
  }

  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <ListadoTareas />
        </main>
      </div>
    </div>
  )
}

export default Proyectos
