import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios'
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import {
	FORMULARIO_PROYECTO, 
	OBTENER_PROYECTOS, 
	AGREGAR_PROYECTO, 
	VALIDAR_FORMULARIO,
	PROYECTO_ACTUAL,
	ELIMINAR_PROYECTO,
	PROYECTO_ERROR
} from '../../types'

const ProyectoState = props => {
	const initialState = {
		proyectos: [],
		formulario: false,
		errorform: false,
		proyecto: null,
		mensaje: null
	}

	const [ state, dispatch ] = useReducer(proyectoReducer, initialState)

	const mostrarFormulario = () => {
		dispatch({
			type: FORMULARIO_PROYECTO
		})
	}

	const obtenerProyectos = async () => {
		try {
			const { data: { proyectos } } = await clienteAxios.get('/api/proyectos')
			dispatch({
				type: OBTENER_PROYECTOS,
				payload: proyectos
			})
		} catch(e) {
			const alerta = {
				msg: e.response.data.msg,
				categoria: 'alerta-error'
			}
			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta
			})
		}
	}

	const agregarProyecto = async proyectoNuevo => {
		try {
			const { data: { proyecto } } = await clienteAxios.post('/api/proyectos', proyectoNuevo)
			dispatch({
				type: AGREGAR_PROYECTO,
				payload: proyecto
			})
		} catch(e) {
			const alerta = {
				msg: e.response.data.msg,
				categoria: 'alerta-error'
			}
			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta
			})
		}
	}

	const mostrarError = () => {
		dispatch({
			type: VALIDAR_FORMULARIO
		})
	}

	const proyectoActual = proyectoId => {
		dispatch({
			type: PROYECTO_ACTUAL,
			payload: proyectoId
		})
	}

	const eliminarProyecto = async proyectoId => {
		try {
			const url = `/api/proyectos/${proyectoId}`
			await clienteAxios.delete(url)
			dispatch({
				type: ELIMINAR_PROYECTO,
				payload: proyectoId
			})
		} catch(e) {
			const alerta = {
				msg: e.response.data.msg,
				categoria: 'alerta-error'
			}
			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta
			})
		}
	}

	return (
		<proyectoContext.Provider
			value={
				{
					proyectos: state.proyectos,
					formulario: state.formulario,
					errorform: state.errorform,
					proyecto: state.proyecto,
					mensaje: state.mensaje,
					mostrarFormulario,
					obtenerProyectos,
					agregarProyecto,
					mostrarError,
					proyectoActual,
					eliminarProyecto
				}
			}
		>
			{
				props.children
			}
		</proyectoContext.Provider>
	)
}

export default ProyectoState
