<template>
    <div class="container">
        <h2>Todo List</h2>
        <div class="input-group" style="margin-bottom:10px;">
            <input type="text" class="form-control" 
                placeholder="할일을 입력하세요" 
                v-model="name" 
                v-on:keyup.enter="createTodo(name)">
            <span class="input-group-btn">
                <button class="btn btn-default" type="button" 
                @click="createTodo(name)">추가</button>
            </span>
        </div>
        <ul class="list-group">
            <li class="list-group-item" v-for="(todo, index) in todos">
            <!-- <li class="list-group-item" v-for="(todo, index) in todos"> -->
            {{todo.name}}
            <div class="btn-group pull-right" 
                style="font-size: 12px; line-height: 1;">


                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown>
                    <template slot="button-content">
                        <em>더보기</em>
                    </template>
                    <b-dropdown-item  href="#" @click="deleteTodo(index)">삭제</b-dropdown-item >
                    </b-nav-item-dropdown>
                </b-navbar-nav>

            </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'TodoPage',
    data () {
        return {
        todos: [
            
        ]
        }
    },
    methods:{
        deleteTodo(i){
            this.todos.splice(i,1);
        },
		createTodo(name){
			if(name != null){
				this.todos.push({name:name});
				this.name = null
			}
		}
    }
}
</script>

<style>
    .container{
        position: relative;
        top: 60px;
        height: 1000px;
    }
</style>
