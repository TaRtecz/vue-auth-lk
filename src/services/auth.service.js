import axios from 'axios';

const API_URL = 'https://backend-front-test.dev.echo-company.ru/api/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'auth/login', {
                phone: user.phone,
                password: user.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();