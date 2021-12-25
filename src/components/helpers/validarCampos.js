const validacionPasada = (valid = true, fail = '') => {
  const msg = valid ? 'valid' : fail || 'invalid'
  return { valid, msg }
}

export const validarCampos = (campos) => {
  if (typeof campos !== 'object') {
    return validacionPasada(false, 'Se requiere un objeto')
  }
  const len = Object.keys(campos).length || campos.length
  if (len <= 0) {
    return validacionPasada(false, 'No hay campos que validar')
  }
  const values = Object.values(campos) || campos
  for (let i = len - 1; i >= 0; i--) {
    if (String(values[i]).trim() === '') {
      return validacionPasada(false, 'No dejar campos vacíos')
    }
  }
  return validacionPasada()
}

export const validarCampo = (campo) => {
  if (campo === null || campo === undefined) {
    return validacionPasada(false, 'Proporcionar un valor válido')
  }
  if (typeof campo === 'string' || typeof campo === 'number') {
    if (String(campo).trim() === '') {
      return validacionPasada(false, 'No dejar el campo vacío')
    }
    if (Number(campo) < 0) {
      return validacionPasada(false, 'No se admiten valores negativos')
    }
    return validacionPasada()
  } else {
    return validacionPasada(false, 'Solo se valida string o number')
  }
}
