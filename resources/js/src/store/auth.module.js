import AuthService from '../services/auth.service';
import axios from 'axios';
import authHeader from '../services/auth.header';

const user = JSON.parse(localStorage.getItem('user'));
const roles = JSON.parse(localStorage.getItem('roles'));
const initialState = user
    ? { status: { loggedIn: true }, user, roles }
    : { status: { loggedIn: false }, user: null, roles: ['guest'] };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                response => {
                    commit('loginSuccess', response);
                    return Promise.resolve(response);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
            window.location.href = '/';
        },
        register({ commit }, user) {
            return AuthService.register(user).then(
                user => {
                    commit('registerSuccess');
                    return Promise.resolve(user);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        },
        async getToken(){
            await axios.get('/sanctum/csrf-cookie').then(response => {
                console.log(response);
            })
        },
        checkLogin(){
            axios.get('/api/user', { headers: authHeader() }).then(response => {
                if(response.data.id != null){
                    initialState.status.loggedIn = true;
                    initialState.user = response.data;
                    initialState.roles = response.data.llaves;
                }
                else commit('loginFailure');
            }).catch(error => {
                console.log(error)
            })
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
            state.roles = user.llaves;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.roles = ['guest'];
        },
        registerSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
            state.roles = user.llaves;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.roles = ['guest'];
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.roles = ['guest'];
        }
    }
};
