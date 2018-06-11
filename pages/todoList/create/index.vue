<template>
    <div>
        <div class="container">
            <h2>Todo List</h2>
            <div class="input-group" style="margin-bottom:10px;">
                <input type="text" class="form-control" 
                    placeholder="제목(대분류)" 
                    v-model="todoTitle" 
                    v-on:keyup.enter="createTodo(todoTitle)" v-if="!istodos">
                <input type="text" class="form-control" 
                    placeholder="제목(소분류)" 
                    v-model="name" 
                    v-on:keyup.enter="detailTodo(name)" v-if="istodos > 0">    
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button" @click="istodos ? detailTodo(name) : createTodo(todoTitle)  ">추가</button>
                </span>
            </div>

            <ul class="list-group">
                <li class="list-group-item" id="todo-title" v-if='istodos'>
                {{todoTitle}}
                    <div class="btn-group pull-right" 
                        style="font-size: 12px; line-height: 1;">
                        <b-navbar-nav class="ml-auto">
                            <b-nav-item-dropdown>
                            <template slot="button-content">
                                <em>더보기</em>
                            </template>
                            <b-dropdown-item  href="#" @click="deleteTodo()">삭제</b-dropdown-item >
                            <b-dropdown-item  href="#" @click="active = true">수정</b-dropdown-item >
                            </b-nav-item-dropdown>
                        </b-navbar-nav>
                    </div>
                </li>

                <li class="list-group-item" v-for="(todo, index) in details" >
                {{ todo.name }}
                    <button type="button" class="close" aria-label="Close" @click="deleteDetail(index)">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </li>
            </ul>
        </div>
        <no-ssr>
            <md-dialog-prompt        
            :md-active.sync="active"
            v-model="todoTitle"
            md-title="대분류"
            md-input-maxlength="30"
            md-input-placeholder="대분류"
            md-confirm-text="OK"/>
        </no-ssr>
    </div>
</template>

<script>

export default {
    name: 'TodoPage',
    data () {
        return {
            todoTitle : null,
            todos: [
                
            ],
            details : [

            ],
            istodos : false,
            name : null,
            active: false,
            value: null
        }
    },
    methods:{
        deleteTodo(){
            this.todoTitle = null;
            this.details = [];
            this.istodos = false;
        },
        deleteDetail(i){
            this.details.splice(i,1);
        },
		createTodo(name){
			if(name != null){
                this.todoTitle = name;
                this.istodos = true;
			}
        },
        detailTodo(name) {
            if(name != null){
				this.details.push({name:name});
                this.name = null;
			}
        },
        test(){
            alert('gggg')
        }
    }
}
</script>

<style scoped>
    .container{
        position: relative;
        top: 60px;
        height: 1000px;
    }
    #todo-title{
        font-size: 1.5rem;
        font-weight:bold;
    }
</style>
