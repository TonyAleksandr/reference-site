import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';
export const getAll = async () => {
    try {
        return await axios.get(API_URL + '/logs/', {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
    } catch (error) {
        return
    }
};

export const createLog = async (email, message) => {
    try {
        return await axios.post(API_URL + '/log/', {
            "email": email,
            "message": message
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
    } catch (error) {
        return
    }
}