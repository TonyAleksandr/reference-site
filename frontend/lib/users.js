import axios from 'axios';

const API_URL = 'http://127.0.0.1:6700';

export const getAllNotifications = async (email) => {
    try {
        return await axios.get(API_URL + '/notifications/' + email, {
          headers: {
              'Content-Type': 'application/json'
          }
        });
    } catch (error) {
        return;
    }
};

export const createNotification = async (email, message) => {
    try {
        return await axios.post(API_URL + '/notification/', {
            "email": email,
            "message": message
        }, {
          headers: {
              'Content-Type': 'application/json'
          }
        });
    } catch (error) {
        return;
    }
};

export const getAllUsers = async () => {
    try {
        return await axios.get(API_URL + '/users/', {
          headers: {
              'Content-Type': 'application/json'
          }
        });
    } catch (error) {
        return;
    }
};

export const getAllStudents = async () => {
    try {
        const response = await axios.get(API_URL + '/students/', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response; 
    } catch (error) {
        console.error('Ошибка при получении студентов:', error);
        return error; 
    }
};

export const fetchStudent = async (email) => {
    try {
        const response = await axios.get(`${API_URL}/student/${email}/`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении студента с email ${email}:`, error);
        return null;
    }
};

export const createStudent = async (email) => {
    try {
        const response = await axios.post(API_URL + '/students/', {
            "email": email
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Ошибка при создании студента:', error);
        return null; 
    }
};

export const deleteStudent = async (email) => {
    try {
        const response = await axios.delete(API_URL + '/students/', {
            data: { "email": email },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Ошибка при удалении студента:', error);
        return null; 
    }
};

export const createTeacher = async (email) => {
    try {
        const response = await axios.post(API_URL + '/teachers/', {
            "email": email
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response; 
    } catch (error) {
        console.error('Ошибка при создании учителя:', error);
        return null; 
    }
};

export const deleteTeacher = async (email) => {
    try {
        const response = await axios.delete(API_URL + '/teachers/', {
            data: { "email": email },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response; 
    } catch (error) {
        console.error('Ошибка при удалении учителя:', error);
        return null; 
    }
};

export const getAllTeachers = async () => {
    try {
        const response = await axios.get(API_URL + '/teachers/', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Ошибка при получении учителей:', error);
        return null; 
    }
};

export const fetchTeacher = async (email) => {
    try {
        const response = await axios.get(`${API_URL}/teacher/${email}/`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении учителя с email ${email}:`, error);
        return null;
    }
};

export const getAllAdmins = async () => {
    try {
        const response = await axios.get(API_URL + '/admins/', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Ошибка при получении администраторов:', error);
        return null; 
    }
};