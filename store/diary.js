import axios from 'axios';
export const state = () => ({
    mainDiary : []
})

export const getters = {
    select(state) {
        return state.mainDiary
    }
}

export const mutations = {
    SET_MAINDIARY(state,payload) {
        state.mainDiary = payload.mainDiary 
    }
}

export const actions = {
    async getMaindiary({ commit,store }, data) {
        await axios.get(process.env.BACKEND_URL + '/mainDiary',{ params : data })
            .then(response => {                
                commit('SET_MAINDIARY', { mainDiary : response.data.data });
            }).catch(err => {
                console.error(err);
            })
    }
}