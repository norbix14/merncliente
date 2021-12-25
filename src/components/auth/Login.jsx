import { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { alertMsg } from '../helpers/alertMsg'
import { validarCampos } from '../helpers/validarCampos'
import ErrorDiv from '../error/Error'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/auth/authContext'

const Login = () => {
  const alertaContext = useContext(AlertaContext)
  const authContext = useContext(AuthContext)

  const { alerta, mostrarAlerta } = alertaContext
  const { mensaje, autenticado, iniciarSesion } = authContext

  const [usuario, guardarUsuario] = useState({
    email: '',
    password: '',
  })

  const { email, password } = usuario

  const handleChange = (e) => {
    const { target } = e
    const { name, value } = target
    guardarUsuario({
      ...usuario,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let registro = validarCampos(usuario)
    if (!registro.valid) {
      return mostrarAlerta(registro.msg, 'alerta-error')
    }
    if (usuario.password.length < 6) {
      return mostrarAlerta(alertMsg.passLenErr, 'alerta-error')
    }
    iniciarSesion({ email, password })
  }

  useEffect(() => {
    if (!autenticado) {
      if (mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
  }, [mensaje, autenticado])

  if (autenticado) {
    return <Navigate to="/proyectos" />
  }

  return (
    <div className="form-usuario">
      {alerta && <ErrorDiv alerta={alerta} />}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Tu email"
              autoComplete="off"
              required
              onChange={handleChange}
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Tu contraseña"
              autoComplete="off"
              required
              onChange={handleChange}
              value={password}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Ingresar"
            />
          </div>
        </form>
        <Link className="enlace-cuenta" to="/nueva-cuenta">
          Obtener una cuenta
        </Link>
      </div>
    </div>
  )
}

export default Login
