import { useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import { validarCampo } from '../helpers/validarCampos'
import { animateClass } from '../helpers/animateClasses'

const NuevoProyecto = () => {
  const proyectosContext = useContext(proyectoContext)
  const [proyecto, guardarProyecto] = useState({ nombre: '' })

  const {
    formulario,
    errorform,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext
  const { nombre } = proyecto

  const showForm = () => mostrarFormulario()

  const handleChange = (e) => {
    const { target } = e
    const { name, value } = target
    guardarProyecto({
      ...nombre,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const campo = validarCampo(nombre)
    if (campo.valid) {
      agregarProyecto(proyecto)
      guardarProyecto({ nombre: '' })
    } else {
      mostrarError()
    }
  }

  return (
    <>
      <button
        type="button"
        className={animateClass('fadeInDown') + 'btn btn-block btn-primario'}
        onClick={showForm}
      >
        Nuevo proyecto
      </button>
      {formulario && (
        <form
          className={animateClass('fadeInLeft') + 'formulario-nuevo-proyecto'}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del proyecto"
            className="input-text"
            onChange={handleChange}
            value={nombre}
          />
          <input
            type="submit"
            value="Crear proyecto"
            className="btn btn-block btn-primario"
          />
        </form>
      )}
      {errorform && (
        <p className={animateClass('shakeY') + 'mensaje error'}>
          Elige un nombre de proyecto
        </p>
      )}
    </>
  )
}

export default NuevoProyecto
