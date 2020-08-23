import clienteAxios from './axios'

const authToken = token => {
	if(!token) {
		delete clienteAxios.defaults.headers.common['x-auth-token']
		return
	}
	clienteAxios.defaults.headers.common['x-auth-token'] = token
}

export default authToken
