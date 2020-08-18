import React, { useEffect, useContext, useState } from 'react'
import shortid from 'shortid'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import { validarCampos } from '../helpers/validarCampos'
import { animateClass } from '../helpers/animateClasses'

const FormTarea = () => {
	const proyectosContext = useContext(proyectoContext)
	const tareasContext = useContext(tareaContext)
	const [ tarea, guardarTarea ] = useState({nombre: ''})

	const { proyecto } = proyectosContext
	const { errortarea, tareaseleccionada, 
					agregarTarea, validarTarea, 
					obtenerTareas, actualizarTarea, 
					limpiarTarea } = tareasContext

	const { nombre } = tarea

	useEffect(() => {
		if(tareaseleccionada !== null) {
			guardarTarea(tareaseleccionada)
		} else {
			guardarTarea({nombre: ''})
		}
	}, [tareaseleccionada])

	if(!proyecto) return null

	const [ proyectoActual ] = proyecto
	
	const handleChange = e => {
		guardarTarea({
			...tarea, 
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		const task = validarCampos(tarea)
		if(task.valid) {
			if(tareaseleccionada === null) {
				tarea.id = shortid.generate()
				tarea.proyectoId = proyectoActual.id
				tarea.estado = false
				agregarTarea(tarea)
			} else {
				actualizarTarea(tarea)
				limpiarTarea()
			}
			obtenerTareas(proyectoActual.id)
			guardarTarea({nombre: ''})
		} else {
			validarTarea()
		}
	}

	return (
		<div className={animateClass('fadeInRight') + "formulario"}>
			<form onSubmit={handleSubmit} >
				<div className="contenedor-input">
					<input 
						type="text" 
						name="nombre" 
						placeholder="Nombre de la tarea" 
						className="input-text"
						value={nombre}
						onChange={handleChange}
					/>
				</div>
				<div className="contenedor-input">
					<input 
						type="submit" 
						className="btn btn-primario btn-submit btn-block"
						value={tareaseleccionada ? "Editar tarea" : "Agregar tarea" }
					/>
				</div>
			</form>
			{
				errortarea && 
				<p className={animateClass('shakeY') + "mensaje error"}>La tarea es obligatoria</p>
			}
		</div>
	)
}

export default FormTarea
