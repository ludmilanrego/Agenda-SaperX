import axios from 'axios';

export default axios.create({
  baseURL: 'http://teste-frontend.saperx.com.br/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

