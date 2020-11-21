import axios from 'axios'

export default axios.create({
  baseURL: 'https://jservice.io',
  headers: {
    'Content-Type': 'application/json',
  },
})
