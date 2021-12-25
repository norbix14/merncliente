import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
/* import RutaPrivada from './components/rutas/RutaPrivada' */

const token = localStorage.getItem('token')
if (token) authToken(token)

const App = () => {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/nueva-cuenta" element={<NuevaCuenta />} />
                <Route exact path="/proyectos" element={<Proyectos />} />
                <Route path="*" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  )
}

export default App
