import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Proyecto = ({proyecto}) => {
	const proyectosContext = useContext(proyectoContext)
	const tareasContext = useContext(tareaContext)

	const { proyectoActual } = proyectosContext
	const { obtenerTareas } = tareasContext

	const showProject = id => {
		proyectoActual(id)
		obtenerTareas(id)
	}

	return (
		<li>
			<button
				type="button"
				className="btn btn-blank"
				onClick={() => showProject(proyecto.id)}
			>{proyecto.nombre}</button>
		</li>
	)
}

Proyecto.propTypes = {
	proyecto: PropTypes.object.isRequired
}

export default Proyecto
