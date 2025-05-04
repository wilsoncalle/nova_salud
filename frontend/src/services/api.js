import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia la URL si tu backend corre en otro puerto o dominio
});
