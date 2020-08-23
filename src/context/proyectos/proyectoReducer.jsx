import {
	FORMULARIO_PROYECTO, 
	OBTENER_PROYECTOS, 
	AGREGAR_PROYECTO, 
	VALIDAR_FORMULARIO,
	PROYECTO_ACTUAL,
	ELIMINAR_PROYECTO,
	PROYECTO_ERROR
} from '../../types'

export default (state, action) => {
	const { type, payload } = action
	switch (type) {
		case FORMULARIO_PROYECTO:
			return {
				...state,
				formulario: true
			}
		case OBTENER_PROYECTOS:
			return {
				...state,
				proyectos: payload
			}
		case AGREGAR_PROYECTO:
			return {
				...state,
				proyectos: [
					payload,
					...state.proyectos
				],
				formulario: false,
				errorform: false
			}
		case VALIDAR_FORMULARIO:
			return {
				...state,
				errorform: true
			}
		case PROYECTO_ACTUAL:
			return {
				...state,
				proyecto: state.proyectos.filter(proyecto => proyecto._id === payload)
			}
		case ELIMINAR_PROYECTO:
			return {
				...state,
				proyectos: state.proyectos.filter(proyecto => proyecto._id !== payload),
				proyecto: null
			}
		case PROYECTO_ERROR:
			return {
				...state,
				mensaje: payload
			}
		default:
			return state
	}
}
