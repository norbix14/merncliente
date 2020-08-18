/** 
 * @param effect es una cadena con el efecto que se desea aplicar
 * @return clases del efecto
*/
export const animateClass = (effect = 'bounce') => {
	return `animate__animated animate__${effect} `
}
