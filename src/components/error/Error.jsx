import React from 'react'
import PropTypes from 'prop-types'
import { animateClass } from '../helpers/animateClasses'

const ErrorDiv = ({alerta}) => (
	<div className={`alerta ${alerta.categoria} ${animateClass('shakeY')}`}>
		{ alerta.msg }
	</div>
)

ErrorDiv.propTypes = {
	alerta: PropTypes.object.isRequired
}

export default ErrorDiv
