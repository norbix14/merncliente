import React, { useEffect, useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import Sidebar from '../layout/Sidebar'
import Barra from '../layout/Barra'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'

const Proyectos = () => {
	const authContext = useContext(AuthContext)
	const { getDatosUsuarioAutenticado } = authContext

	useEffect(() => {
		getDatosUsuarioAutenticado()
		// eslint-disable-next-line
	}, [])

	return (
		<div className="contenedor-app">
			<Sidebar />
			<div className="seccion-principal">
				<Barra />
				<main>
					<FormTarea />
					<ListadoTareas />
				</main>
			</div>
		</div>
	)
}

export default Proyectos
