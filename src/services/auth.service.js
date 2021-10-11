import axios from 'axios';
import authHeader from './auth-header';
import UserService from "../services/user.service";

const API_URL = 'https://backend-front-test.dev.echo-company.ru/api/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'auth/login', {
                phone: user.phone,
                password: user.password
            }, { headers: authHeader() })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    UserService.getUserBoard();
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'user/registration', {
            phone: user.phone,
            first_name: user.first_name,
            last_name: user.last_name,
            password: user.password
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                UserService.getUserBoard();
            }

            return response.data;
        });
    }
}

export default new AuthService();