import axios from 'axios';
import authHeader from './auth.header';
import { ref } from 'vue';
import { useStore } from 'vuex';

const API_URL = '/api/auth/';

class AuthService {
    login(user) {
        return axios.post(API_URL + 'login', {
            email: user.username,
            password: user.password
        })
        .then(response => {
            if (response.data.id) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('roles', JSON.stringify(response.data.llaves));
            }else{
                localStorage.removeItem('user');
                localStorage.removeItem('roles');
            }
            return response.data;
        });
    }

    // checkLogin(user){
    //     return axios
    //     .get('/api/user')
    //     .then(response => [
    //         if(response.data.id != null)
    //     ])
    // }

    logout() {
        axios.get(API_URL + 'logout', { headers: authHeader() });
        localStorage.removeItem('user');
        localStorage.removeItem('roles');
    }

    register(user) {
        return axios
        .post(API_URL + 'register', {
            username: user.fullname,
            email: user.email,
            password: user.password
        })
        .then(response => {
            if (response.data.id) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('roles', JSON.stringify(response.data.llaves));
            }
            return response.data;
        });
    }

    roleAccess(name) {
        const store = useStore();
        const usuarioRoles = ref(store.state.auth.roles);
        const getRoles = usuarioRoles._value;

        return getRoles.includes(name) ? true : false;
    }
}

export default new AuthService();
