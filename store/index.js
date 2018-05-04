export const state = () => ({
    token : null,
    authenticated: null,
    userInfo :null
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
    }
}