import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { validarCampos } from '../helpers/validarCampos'

const Login = () => {
	const [ usuario, guardarUsuario ] = useState({
		email: '',
		password: ''
	})

	const { email, password } = usuario

	const handleChange = e => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		let registro = validarCampos(usuario)
		if(registro.valid) {
			console.log(registro.msg)
		} else {
			console.warn(registro.msg)
		}
	}

	return (
		<div className="form-usuario">
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
				<Link 
					className="enlace-cuenta"
					to={'/nueva-cuenta'}
				>Obtener una cuenta</Link>
			</div>
		</div>
	)
}

export default Login
