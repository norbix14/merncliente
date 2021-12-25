import { useReducer } from 'react'
import PropTypes from 'prop-types'
import clienteAxios from '../../config/axios'
import tareaContext from './tareaContext'
import tareaReducer from './tareaReducer'
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from '../../types'

const TareaState = (props) => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  }

  const [state, dispatch] = useReducer(tareaReducer, initialState)

  const obtenerTareas = async (proyecto) => {
    try {
      const {
        data: { tareas },
      } = await clienteAxios.get('/api/tareas', { params: { proyecto } })
      dispatch({
        type: TAREAS_PROYECTO,
        payload: tareas,
      })
    } catch (e) {
      console.log(e.response.data.msg)
    }
  }

  const agregarTarea = async (tareaNueva) => {
    try {
      const {
        data: { tarea },
      } = await clienteAxios.post('/api/tareas', tareaNueva)
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea,
      })
    } catch (e) {
      console.log(e.response.data.msg)
    }
  }

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    })
  }

  const eliminarTarea = async (id, proyecto) => {
    try {
      const url = `/api/tareas/${id}`
      await clienteAxios.delete(url, { params: { proyecto } })
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      })
    } catch (e) {
      console.log(e.response.data.msg)
    }
  }

  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    })
  }

  const actualizarTarea = async (tareaActual) => {
    try {
      const url = `/api/tareas/${tareaActual._id}`
      const {
        data: { tarea },
      } = await clienteAxios.put(url, tareaActual)
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: tarea,
      })
    } catch (e) {
      console.log(e.response.data.msg)
    }
  }

  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    })
  }

  return (
    <tareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  )
}

TareaState.propTypes = {
  children: PropTypes.any,
}

export default TareaState
