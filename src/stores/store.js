// store.js
import { createStore } from 'vuex';

const store = createStore({
    state: {
        token: localStorage.getItem('token') || '',
        user: (() => {
            try {
                return JSON.parse(localStorage.getItem('user'));
            } catch (e) {
                console.error('Error parsing user data from localStorage:', e);
                return null;
            }
        })(),
        isLogedIn: !!localStorage.getItem('token'),
        albumUpdateFlag: false,
        equipmentsUpdatedFlag: false,
        albums: [],
        equipments: [],
        reviews: [],
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.isLogedIn = true;
            localStorage.setItem('user', JSON.stringify(user));
        },
        clearUser(state) {
            state.user = null;
            state.isLogedIn = false;
            localStorage.removeItem('user');
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem('token');
        },
        setIsLogedIn(state, status) {
            state.isLogedIn = status;
        },
        albumUpdated(state) {
            state.albumUpdateFlag = !state.albumUpdateFlag; // Toggle the flag to indicate an update
        },
        equipmentsUpdated(state) {
            state.equipmentsUpdatedFlag = !state.equipmentsUpdatedFlag;
        },
        setAlbums(state, albums) {
            state.albums = albums; // Set the albums in the state
        },
        setEquipments(state, equipments){
            state.equipments = equipments;
        },
        setReviews(state, reviews){
            state.reviews = reviews;
        },
    },
    actions: {
        login({ commit }, { user, token }) {
            commit('setUser', user);
            commit('setToken', token);
            commit('setIsLogedIn', true);
        },
        logout({ commit }) {
            commit('clearUser');
            commit('clearToken');
            commit('setIsLogedIn', false);
        },
        setAlbums({ commit }, albums) {
            commit('setAlbums', albums); // Commit the albums to the state
        },
        setEquipments({ commit }, equipments){
            commit('setEquipments', equipments);
        },
        setReviews({ commit }, reviews){
            commit('setReviews', reviews);
        },
    },
    getters: {
        isAuthenticated: state => !!state.token && !!state.user,
        user: state => state.user,
        token: state => state.token,
        isLogedIn: state => state.isLogedIn,
        albums: state => state.albums, // Getter for albums
        equipments: state => state.equipments,
        reviews: state => state.reviews,
    }
});

export default store;