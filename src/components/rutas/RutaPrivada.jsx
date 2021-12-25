import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import AuthContext from '../../context/auth/authContext'

const RutaPrivada = ({ element: Component, ...props }) => {
  const authContext = useContext(AuthContext)
  const { autenticado, cargando, getDatosUsuarioAutenticado } = authContext

  useEffect(() => {
    getDatosUsuarioAutenticado()
  }, [])

  return (
    <>
      {!autenticado && !cargando ? (
        <Navigate to="/" />
      ) : (
        <Component {...props} />
      )}
    </>
  )
}

RutaPrivada.propTypes = {
  element: PropTypes.any,
}

export default RutaPrivada
