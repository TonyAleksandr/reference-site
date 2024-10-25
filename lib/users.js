import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const getAllUsers = async () => {
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
export const getAllAdmins = async () => {
    try {
        const response = await axios.get(API_URL + '/admins/', {
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
