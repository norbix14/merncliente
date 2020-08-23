import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios'
import authToken from '../../config/authToken'
import authContext from './authContext'
import authReducer from './authReducer'
import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	OBTENER_USUARIO,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	CERRAR_SESION
} from '../../types/'

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		autenticado: null,
		usuario: null,
		mensaje: null,
		cargando: true
	}
	const [ state, dispatch ] = useReducer(authReducer, initialState)
	
	const getDatosUsuarioAutenticado = async () => {
		const token = localStorage.getItem('token')
		if(token) authToken(token)
		try {
			const { data: { usuario } } = await clienteAxios.get('/api/auth')
			dispatch({
				type: OBTENER_USUARIO,
				payload: usuario
			})
		} catch(e) {
			dispatch({
				type: LOGIN_ERROR
			})
		}
	}

	const registrarUsuario = async datos => {
		try {
			const { data } = await clienteAxios.post('/api/usuarios', datos)
			dispatch({
				type: REGISTRO_EXITOSO,
				payload: data
			})
			getDatosUsuarioAutenticado()
		} catch(e) {
			const alerta = {
				msg: e.response.data.msg,
				categoria: 'alerta-error'
			}
			dispatch({
				type: REGISTRO_ERROR,
				payload: alerta
			})
		}
	}

	const iniciarSesion = async datos => {
		try {
			const { data } = await clienteAxios.post('/api/auth', datos)
			dispatch({
				type: LOGIN_EXITOSO,
				payload: data
			})
			getDatosUsuarioAutenticado()
		} catch(e) {
			const alerta = {
				msg: e.response.data.msg,
				categoria: 'alerta-error'
			}
			dispatch({
				type: LOGIN_ERROR,
				payload: alerta
			})
		}
	}

	const cerrarSesion = () => {
		dispatch({
			type: CERRAR_SESION,
			payload: 'Sesión cerrada'
		})
	}

	return (
		<authContext.Provider
			value={
				{
					token: state.token,
					autenticado: state.autenticado,
					usuario: state.usuario,
					mensaje: state.mensaje,
					cargando: state.cargando,
					registrarUsuario,
					getDatosUsuarioAutenticado,
					iniciarSesion,
					cerrarSesion
				}
			}
		>
			{
				props.children
			}
		</authContext.Provider>
	)
}

export default AuthState
