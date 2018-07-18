import axios from 'axios';

export const state = () => ({
    token : null,
    authenticated: null,
    userInfo :false,
    isleave : false
})

export const getters = {
    isAuthenticated(state) {
        return !!state.token
    },
    userInfo(state) {
        return state.userInfo
    },
    token(state) {
        return state.token
    },
    isLeave(state) {
        return state.isleave
    }
}

export const mutations = {
    SET_AUTH(state,payload) {
        state.authenticated = payload.authenticated;
    },
    SET_TOKEN(state,payload) {
        state.token = payload.token;
    },    
    SET_USER(state,payload) {
        state.userInfo = payload.userInfo
    },
    SET_ISLEAVE(state,payload) {
        state.isleave = payload.isleave
    }
}

export const actions = {
    setHeaderAuth({ commit }, token){
        axios.defaults.headers.common.Authorization ='Bearer '+ token;
    }
}