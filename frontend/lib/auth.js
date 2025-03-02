import axios from "axios";
import Cookies from "js-cookie";

const API_URL = 'http://127.0.0.1:6700';
export async function setAuth(email, password) {
    Cookies.set('email', email); 
    Cookies.set('password', password); 
  };

  export const getAll = async () => {
    try {
        return await axios.get(API_URL + '/users/', {
          headers: {
              'Content-Type': 'application/json'
          }
        });
    } catch (error) {
        return
    }
  }
  export const create = async (formData) => {
    try {
        return await axios.post(API_URL + '/users/', formData, {
          headers: {
          'Content-Type': 'application/json'
      }});
    } catch (error) {
        return
    }
  }