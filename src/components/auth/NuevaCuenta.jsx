import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { validarCampos } from '../helpers/validarCampos'

const NuevaCuenta = () => {
	const [ usuario, guardarUsuario ] = useState({
		nombre: '',
		email: '',
		password: '',
		confirmar: ''
	})

	const { nombre, email, password, confirmar } = usuario

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
			if(usuario.password !== usuario.confirmar) {
				console.log('las contraseñas no coinciden')
			} else {
				console.log(registro.msg)
			}
		} else {
			console.warn(registro.msg)
		}
	}

	return (
		<div className="form-usuario">
			<div className="contenedor-form sombra-dark">
				<h1>Crear cuenta</h1>
				<form onSubmit={handleSubmit}>
					<div className="campo-form">
						<label htmlFor="nombre">Nombre</label>
						<input 
							type="text" 
							name="nombre" 
							id="nombre"
							placeholder="Tu nombre"
							autoComplete="off"
							onChange={handleChange}
							value={nombre}
						/>
					</div>
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
						<label htmlFor="confirmar">Confirmar contraseña</label>
						<input 
							type="password" 
							name="confirmar" 
							id="confirmar"
							placeholder="Confirmar contraseña"
							autoComplete="off"
							onChange={handleChange}
							value={confirmar}
						/>
					</div>
					<div className="campo-form">
						<input 
							type="submit" 
							className="btn btn-primario btn-block"
							value="Registrarme"
						/>
					</div>
				</form>
				<Link 
					className="enlace-cuenta"
					to={'/'}
				>Iniciar sesión</Link>
			</div>
		</div>
	)
}

export default NuevaCuenta
