import axios from 'axios'

const clienteAxios = axios.create({
  baseURL: 'https://hidden-earth-48782.herokuapp.com',
})

export default clienteAxios
