import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://backend-front-test.dev.echo-company.ru/api/';

class UserService {

    getUserBoard() {
        return axios
            .get(API_URL + 'user', { headers: authHeader() })
            .then(response => {
                if (response.data) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    this.$store.dispatch("auth/login", JSON.stringify(response.data))
                }
                return response.data;
            });
            

    }
}

export default new UserService();