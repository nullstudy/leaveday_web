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
    SET_CHANGETODO(state,payload){
        let todoIndex = state.showTodoList.map(function(e) { return e._id }).indexOf(payload.id)
        state.showTodoList[todoIndex].active ? state.showTodoList[todoIndex].active = false : state.showTodoList[todoIndex].active = true
    },
    SET_CHANGTOTALTODO(state,payload){
        let detailIndex = state.showTodoList[payload.index].detail.map(function(e) { return e._id }).indexOf(payload._id) //showtodo
        state.showTodoList[payload.index].detail[detailIndex].status ?  //showtodo
        state.showTodoList[payload.index].detail[detailIndex].status = false : state.showTodoList[payload.index].detail[detailIndex].status = true        
    },
    SET_FINISHTODO(state,payload) {
        state.showTodoList[payload.index].active = false 
        state.showTodoList[payload.index].status = payload.status;
        let todoId = state.todoList.map(function(e) { return e._id }).indexOf(state.showTodoList[payload.index]._id) //showtodo
        state.todoList[todoId].status = payload.status
    }
}

export const actions = {
    async getTodoList({ commit,store }, user_id) {
        await axios.get(process.env.BACKEND_URL + '/todoList',{ params : {  _id : user_id }})
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
        }).catch(err => {
            console.error(err);
        })
    }
}