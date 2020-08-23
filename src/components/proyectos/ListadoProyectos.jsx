import React, { Fragment, useContext, useEffect } from 'react'
import AlertaContext from '../../context/alertas/alertaContext'
import proyectoContext from '../../context/proyectos/proyectoContext'
import Proyecto from './Proyecto'
import { animateClass } from '../helpers/animateClasses'
import ErrorDiv from '../error/Error'

const ListadoProyectos = () => {
	const alertaContext = useContext(AlertaContext)
	const proyectosContext = useContext(proyectoContext)

	const { alerta, mostrarAlerta } = alertaContext
	const { mensaje, proyectos, obtenerProyectos } = proyectosContext
	
	useEffect(() => {
		if(mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria)
		obtenerProyectos()
		// eslint-disable-next-line
	}, [mensaje])

	if(proyectos.length <= 0) {
		return <h3 
			className={animateClass('fadeInLeft')}
		>Comienza a crear proyectos!</h3>
	}

	return (
	  <Fragment>
			{
				alerta && <ErrorDiv alerta={alerta} />
			}
		  <div className={animateClass('fadeInLeft') + "proyectos"}>
		  	<h2>Tus proyectos creados</h2>
				<ul className="listado-proyectos">
					{
						(proyectos.length > 0) && (
							proyectos.map(proyecto => (
								<Proyecto 
									key={proyecto._id}
									proyecto={proyecto}
								/>
							))
						)
					}
				</ul>
		  </div>
	  </Fragment>
	)
}

export default ListadoProyectos
