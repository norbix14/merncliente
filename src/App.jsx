import React from 'react'
import {
	BrowserRouter as Router, 
	Switch, 
	Route
} from 'react-router-dom'
/* Auth */
import authToken from './config/authToken'
/* Components */
import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from './components/proyectos/Proyectos'
/* Contexts */
import AlertaState from './context/alertas/alertaState'
import AuthState from './context/auth/authState'
import ProyectoState from './context/proyectos/proyectoState'
import TareaState from './context/tareas/tareaState'
/* Higher Order Component */
import RutaPrivada from './components/rutas/RutaPrivada'

const token = localStorage.getItem('token')
if(token) authToken(token)

const App = () => {
  return (
	  <ProyectoState>
	  	<TareaState>
	  		<AlertaState>
			    <AuthState>
				    <Router>
				      <Switch>
				        <Route 
				        	exact 
				        	path="/" 
				        	component={Login} 
				        />
				        <Route 
				        	exact 
				        	path="/nueva-cuenta" 
				        	component={NuevaCuenta} 
				        />
				        <RutaPrivada 
				        	exact 
				        	path="/proyectos" 
				        	component={Proyectos} 
				        />
				      </Switch>
				    </Router>
			    </AuthState>
	  		</AlertaState>
	  	</TareaState>
	  </ProyectoState>
  )
}

export default App
