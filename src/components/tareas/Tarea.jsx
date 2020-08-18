import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Tarea = ({tarea}) => {
	const tareasContext = useContext(tareaContext)
	const proyectosContext = useContext(proyectoContext)

	const { eliminarTarea, obtenerTareas, 
					cambiarEstadoTarea, guardarTareaActual } = tareasContext
	const { proyecto } = proyectosContext

	const [ proyectoActual ] = proyecto

	const handleDelete = id => {
		eliminarTarea(id)
		obtenerTareas(proyectoActual.id)
	}

	const cambiarEstado = tarea => {
		tarea.estado = !tarea.estado
		cambiarEstadoTarea(tarea)
	}

	const seleccionarTarea = tarea => {
		guardarTareaActual(tarea)
	}

	return (
		<li className="tarea sombra">
			<p>{tarea.nombre}</p>
			<div className="estado">
				{
					(tarea.estado) ? (
						<button 
							type="button"
							className="completo"
							onClick={() => cambiarEstado(tarea)}
						>Completo</button>
					) : (
						<button 
							type="button"
							className="incompleto"
							onClick={() => cambiarEstado(tarea)}
						>Incompleto</button>
					)
				}
			</div>
			<div className="acciones">
				<button
					type="button"
					className="btn btn-primario"
					onClick={() => seleccionarTarea(tarea)}
				>Editar</button>
				<button
					type="button"
					className="btn btn-secundario"
					onClick={() => handleDelete(tarea.id)}
				>Eliminar</button>
			</div>
		</li>
	)
}

Tarea.propTypes = {
	tarea: PropTypes.object.isRequired
}

export default Tarea
