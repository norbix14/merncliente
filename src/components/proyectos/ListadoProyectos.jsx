import React, { useContext, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import Proyecto from './Proyecto'
import { animateClass } from '../helpers/animateClasses'

const ListadoProyectos = () => {
	const proyectosContext = useContext(proyectoContext)
	const { proyectos, obtenerProyectos } = proyectosContext
	
	useEffect(() => {
		obtenerProyectos()
		// eslint-disable-next-line
	}, [])

	if(proyectos.length <= 0) {
		return <h3 
			className={animateClass('fadeInLeft')}
		>Comienza a crear proyectos!</h3>
	}

	return (
	  <div className={animateClass('fadeInLeft') + "proyectos"}>
	  	<h2>Tus proyectos creados</h2>
			<ul className="listado-proyectos">
				{
					(proyectos.length > 0) && (
						proyectos.map(proyecto => (
							<Proyecto 
								key={proyecto.id}
								proyecto={proyecto}
							/>
						))
					)
				}
			</ul>
	  </div>
	)
}

export default ListadoProyectos
