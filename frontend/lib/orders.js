import axios from 'axios';

const API_URL = 'http://127.0.0.1:6700';
export const edit = async (id, result, status) => {
    try {
        const data = {
            "id": id,
            "result": result,
            "status": status
        }
        return await axios.put(API_URL + "/order/", data)
    } catch (error) {
        return
    }
};
export const get = async (email) => {
    try {
        return await axios.get(API_URL + '/orders/' + email);
    } catch (error) {
        return
    }
}

export const create = async (email, fullName, institution, course, phone, medicalData, description) => {
    try {
        return await axios.post(API_URL + '/order/', {
          "email": email,
          "fullName": fullName,
          "institution": institution,
          "course": course,
          "phone": phone,
          "medicalData": medicalData,
          "status": "new",
          "description": description
      }, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return
    }
}

