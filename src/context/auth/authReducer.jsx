import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	OBTENER_USUARIO,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	CERRAR_SESION
} from '../../types/'

export default (state, action) => {
	const { type, payload } = action
	switch (type) {
		case REGISTRO_EXITOSO:
		case LOGIN_EXITOSO:
			localStorage.setItem('token', payload.token)
			return {
				...state,
				autenticado: true,
				mensaje: null,
				cargando: false
			}
		case LOGIN_ERROR:
		case REGISTRO_ERROR:
		case CERRAR_SESION:
			localStorage.removeItem('token')
			return {
				...state,
				mensaje: payload,
				token: null,
				usuario: null,
				autenticado: null,
				cargando: false
			}
		case OBTENER_USUARIO:
			return {
				...state,
				autenticado: true,
				cargando: false,
				token: localStorage.getItem('token'),
				usuario: payload
			}
		default:
			return state
	}
}
