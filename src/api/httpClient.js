import axios from 'axios'

export default axios.create({
  baseURL: 'http://jservice.io',
  headers: {
    'Content-Type': 'application/json',
  },
})
