import axios from 'axios';
export const state = () => ({
    token : null,
    authenticated: null,
    userInfo :false,
    isleave : false,
    todoList : null,
    jobDiary : null,
    diaryDetail : {}
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
    },
    todoList(state) {
        return state.todoList
    },
    jobDiary(state) {
        return state.jobDiary
    },
    diaryDetail(state) {
        return  state.diaryDetail
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
    },
    SET_TODO(state,payload) {
        state.todoList = payload.todoList
    },
    SET_DIARY(state,payload) {
        state.jobDiary = payload.jobDiary
    },
    SET_DIARYDETAIL(state,payload) {
        state.diaryDetail = payload.diaryDetail
    }
}

export const actions = {
    getTodoList({ commit },user_id) {
        axios.get(process.env.BACKEND_URL + '/todoList',{ params : {  _id : user_id }})
            .then(response => {
                commit('SET_TODO', { todoList : response.data.data })
            }).catch(err => {
                console.error(err);
            })
    }
}