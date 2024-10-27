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

export const createAuth = async (email) => {
    try {
        return await axios.post(API_URL + '/auth/', {
            "email": email
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

export const createUnAuth = async (email) => {
    try {
        return await axios.post(API_URL + '/unauth/', {
            "email": email
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

export const createClick = async (email, nameButton) => {
    try {
        return await axios.post(API_URL + '/click/', {
            "email": email,
            "nameButton": nameButton
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