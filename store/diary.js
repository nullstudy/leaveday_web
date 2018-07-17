import axios from 'axios';
export const state = () => ({
    mainDiary : [],
    jobDiary : null,
    diaryDetail : {},
    page : null,
    realDiary : null
})

export const getters = {
    mainDiary(state) {
        return state.mainDiary
    },
    jobDiary(state) {
        return state.jobDiary
    },
    diaryDetail(state) {
        return  state.diaryDetail
    },
    page(state) {
        return state.page
    },
    realDiary(state) {
        return state.realDiary
    }
}

export const mutations = {
    SET_MAINDIARY(state,payload) {
        state.mainDiary = payload.mainDiary 
    },
    SET_DIARY(state,payload) {
        state.jobDiary = payload.jobDiary
    },
    SET_DIARYDETAIL(state,payload) {
        state.diaryDetail = payload.diaryDetail
    },
    SET_PAGE(state,payload) {
        state.page = payload.page
    },
    SET_REALDIARY(state,payload) {
        state.realDiary = payload.realDiary
    },
    UPDATE_REALDIARY(state,payload) {
        for(var item in payload.data){
            state.realDiary.push(payload.data[item])  
        }    
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