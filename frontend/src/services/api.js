
import instance from './axios.customize.js';

const loginApi = async (username, password) => {
    
    const response = await instance.post('/api-v1/login', {
        username,
        password
    });
    return response;
}

const registerApi = async (username, password, full_name, email, phone, apartment_code) => {
    const response = await instance.post('/api-v1/register', {
        username,
        password,
        full_name,
        email,
        phone,
        apartment_code
    });

    return response;
}

export { loginApi, registerApi };