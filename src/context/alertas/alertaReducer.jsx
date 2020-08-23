import {
	MOSTRAR_ALERTA,
	OCULTAR_ALERTA
} from '../../types/'

export default (state, action) => {
	const { type, payload } = action
	switch (type) {
		case MOSTRAR_ALERTA:
			return { alerta: payload }	
		case OCULTAR_ALERTA:
			return { alerta: null }
		default:
			return state
	}
}
