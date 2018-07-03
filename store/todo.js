import axios from 'axios';
export const state = () => ({
    todoList : [],
    showTodoList : [],
    detailTodoList : [],
    select : 1
})

export const getters = {
    select(state) {
        return state.select
    },
    todoList(state) {
        return state.todoList
    },
    showTodoList(state) {
        return state.showTodoList
    },
    detailTodoList(state) {
        return state.detailTodoList
    }
}

export const mutations = {
    SET_SELECT(state,payload) {
        state.select = payload.select 
    },
    SET_TODO(state,payload) {
        state.todoList = payload.todoList 
    },
    SET_SHOWTODO(state,payload) {
        let filterTodo = state.todoList.filter( item => item.status === state.select);
        state.showTodoList = filterTodo;
    },
    SET_DETAIL(state,payload){
        state.detailTodoList = payload.detailTodoList;
    },
    SET_CHANGETODO(state,payload){
        let todoIndex = state.showTodoList.map(function(e) { return e._id }).indexOf(payload.id)
        state.showTodoList[todoIndex].active ? state.showTodoList[todoIndex].active = false : state.showTodoList[todoIndex].active = true
    },
    SET_CHANGTOTALTODO(state,payload){
        let _id = state.showTodoList[payload.index]._id; // todo
        let todoIndex = state.todoList.map(function(e) { return e._id }).indexOf(_id) //todo
        let detailIndex = state.showTodoList[payload.index].detail.map(function(e) { return e._id }).indexOf(payload._id) //showtodo
        state.showTodoList[payload.index].detail[detailIndex].status ?  //showtodo
        state.showTodoList[payload.index].detail[detailIndex].status = false : state.showTodoList[payload.index].detail[detailIndex].status = true        
        state.todoList[todoIndex].detail[payload.index].status ? //todo
        state.todoList[todoIndex].detail[payload.index].status = false : state.todoList[todoIndex].detail[payload.index].status = true
    }
}

export const actions = {
    getTodoList({ commit,store }, user_id) {
        axios.get(process.env.BACKEND_URL + '/todoList',{ params : {  _id : user_id }})
            .then(response => {
                commit('SET_TODO', { todoList : response.data.data });
                commit('SET_SHOWTODO');
            }).catch(err => {
                console.error(err);
            })
    },
    putDetailTodo({ commit }, data){
        axios.put(process.env.BACKEND_URL + '/todoUpdate', data )
        .then(response => {
            // commit('SET_TODO', { todoList : response.data.data });
        }).catch(err => {
            console.error(err);
        })
    }
}