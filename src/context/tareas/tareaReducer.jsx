import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from '../../types'

export default (state, action) => {
  const { type, payload } = action
  switch (type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasproyecto: payload,
      }
    case AGREGAR_TAREA:
      return {
        ...state,
        tareasproyecto: [payload, ...state.tareasproyecto],
        errortarea: false,
      }
    case VALIDAR_TAREA:
      return {
        ...state,
        errortarea: true,
      }
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasproyecto: state.tareasproyecto.filter(
          (tarea) => tarea._id !== payload
        ),
      }
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareasproyecto: state.tareasproyecto.map((tarea) =>
          tarea._id === payload._id ? payload : tarea
        ),
        errortarea: false,
      }
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaseleccionada: payload,
      }
    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaseleccionada: null,
      }
    default:
      return state
  }
}
