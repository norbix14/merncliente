import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import Tarea from './Tarea'
import { animateClass } from '../helpers/animateClasses'

const ListadoTareas = () => {
	const proyectosContext = useContext(proyectoContext)
	const tareasContext = useContext(tareaContext)

	const { proyecto, eliminarProyecto } = proyectosContext
	const { tareasproyecto } = tareasContext

	if(!proyecto) return <h2>Elige un proyecto</h2>

	const [ proyectoActual ] = proyecto

	const handleDelete = () => eliminarProyecto(proyectoActual._id)

	return (
	  <div className={animateClass('fadeInRight') + "contenedor-tareas"}>
			<h2>Proyecto: {proyectoActual.nombre}</h2>
			<ul className="listado-tareas">
				{
					(tareasproyecto.length > 0) ? (
						tareasproyecto.map(tarea => (
					  	<Tarea 
					  		key={tarea._id}
					  		tarea={tarea} 
					  	/>
						))
					) : (
						<li className="tarea">Este proyecto no tiene tareas</li>
					)
				}
			</ul>
			<button 
				className="btn btn-eliminar"
				onClick={handleDelete}
			>Eliminar proyecto &times;</button>
	  </div>
	)
}

export default ListadoTareas
