<template>
    <div class='wrap-todo-create'>
        <div class="container">
            <br><hr>
            <h1>MyLog 생성</h1>
            <hr>
            시작일 <md-datepicker v-model="startDT"/>
            종료일 <md-datepicker v-model="endDT"/>
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

                <li class="list-group-item" v-for="(detail, index) in details" >
                {{ detail.todo }}
                    <button type="button" class="close" aria-label="Close" @click="deleteDetail(index)">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </li>

                <div class='todo_create_btn'>
                    <md-button class="md-raised md-primary"  @click='todoInsert'>생성</md-button>
                    <md-button class="md-raised md-primary" >취소</md-button>
                </div>
          
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
import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'TodoPage',
    data () {
        return {
            todoTitle : null,
            details : [

            ],
            istodos : false,
            name : null,
            active: false,
            startDT : new Date(),
            endDT : new Date()
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
				this.details.push({ todo : name ,status:false});
                this.name = null;
			}
        },
        async todoInsert(){
            let todoData = {
                title : this.todoTitle,
                startDT : this.startDT,
                endDT : this.endDT,
                detail : this.details
            }
            console.log(todoData)
            axios.defaults.headers.common.Authorization ='Bearer '+ this.token;
            await axios.post(process.env.BACKEND_URL + '/todoCreate', todoData )
            .then(response => {
                return this.$router.push('/todoList');
            }).catch(err => {
                return console.error(err);
            })
        }
    },
    computed: {
      ...mapGetters({
        token : 'token'
      })
    }
}
</script>

<style scoped>
    .wrap-todo-create {
        position: relative;
        top: 48px;
        background: white;   
    }

    #todo-title{
        font-size: 1.5rem;
        font-weight:bold;
    }
    .todo_create_btn {
        margin : 0 auto;
    }
</style>
