import React, { useEffect, useContext } from 'react'
import AuthContext from '../../context/auth/authContext'

const Barra = props => {
	const authContext = useContext(AuthContext)
	const { usuario, getDatosUsuarioAutenticado, 
					cerrarSesion } = authContext
	
	const handleLogout = () => cerrarSesion()
	
	useEffect(() => {
		getDatosUsuarioAutenticado()
		// eslint-disable-next-line
	}, [])
	
	return (
		<header className="app-header">
			{
				usuario &&
				<p className="nombre-usuario">
					Hola <span>{usuario.nombre}</span>
				</p>
			}
			<nav className="nav-principal">
				<button
					type="button"
					className="btn btn-blank cerrar-sesion"
					onClick={handleLogout}
				>Cerrar sesión</button>
			</nav>
		</header>
	)
}

export default Barra
