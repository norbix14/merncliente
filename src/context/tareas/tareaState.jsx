import React, { useReducer } from 'react'
import tareaContext from './tareaContext'
import tareaReducer from './tareaReducer'
import {
	TAREAS_PROYECTO,
	AGREGAR_TAREA,
	VALIDAR_TAREA,
	ELIMINAR_TAREA,
	ESTADO_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
	LIMPIAR_TAREA
} from '../../types'

const TareaState = props => {
	const tareas = [
		{id: 1, nombre: 'tarea asd', estado: true, proyectoId: 1},
		{id: 2, nombre: 'tarea wef', estado: false, proyectoId: 2},
		{id: 3, nombre: 'tarea fsa', estado: true, proyectoId: 3},
		{id: 4, nombre: 'tarea ewe', estado: false, proyectoId: 4},
		{id: 5, nombre: 'tarea bfv', estado: true, proyectoId: 4},
		{id: 6, nombre: 'tarea xcv', estado: false, proyectoId: 2},
		{id: 7, nombre: 'tarea jty', estado: true, proyectoId: 1},
		{id: 8, nombre: 'tarea iol', estado: false, proyectoId: 3}
	]

	const initialState = {
		tareas,
		tareasproyecto: null,
		errortarea: false,
		tareaseleccionada: null
	}

	const [ state, dispatch ] = useReducer(tareaReducer, initialState)

	const obtenerTareas = proyectoId => {
		dispatch({
			type: TAREAS_PROYECTO,
			payload: proyectoId
		})
	}

	const agregarTarea = tarea => {
		dispatch({
			type: AGREGAR_TAREA,
			payload: tarea
		})
	}

	const validarTarea = () => {
		dispatch({
			type: VALIDAR_TAREA
		})
	}

	const eliminarTarea = id => {
		dispatch({
			type: ELIMINAR_TAREA,
			payload: id
		})
	}

	const cambiarEstadoTarea = tarea => {
		dispatch({
			type: ESTADO_TAREA,
			payload: tarea
		})
	}

	const guardarTareaActual = tarea => {
		dispatch({
			type: TAREA_ACTUAL,
			payload: tarea
		})
	}

	const actualizarTarea = tarea => {
		dispatch({
			type: ACTUALIZAR_TAREA,
			payload: tarea
		})
	}

	const limpiarTarea = () => {
		dispatch({
			type: LIMPIAR_TAREA
		})
	}
	
	return (
		<tareaContext.Provider
			value={
				{
					tareas: state.tareas,
					tareasproyecto: state.tareasproyecto,
					errortarea: state.errortarea,
					tareaseleccionada: state.tareaseleccionada,
					obtenerTareas,
					agregarTarea,
					validarTarea,
					eliminarTarea,
					cambiarEstadoTarea,
					guardarTareaActual,
					actualizarTarea,
					limpiarTarea
				}
			}
		>
			{
				props.children
			}
		</tareaContext.Provider>
	)
}

export default TareaState
