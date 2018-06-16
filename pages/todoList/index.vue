<template>
    <div class='todo-wrap'>
      <div>
        <b-form-select v-model="selected" :options="options" class="mb-3" />
        <!-- <div>Selected: <strong>{{ selected }}</strong></div> -->
      </div>
      
      <!-- <div>
        정보{{ todoFormat }}
      </div> -->
      <div calss="container">
        <tab v-bind:tabs="tabs" v-bind:selected-tab="selectedTab" v-on:@change="onClickTab"></tab>
     </div>
 
      <div>
        <list v-bind:selected-tab="selectedTab" v-bind:data="todoList"
          v-on:@finish="onClickFinish"
          v-on:@reset="onClickReset"></list>
      </div>
      <div>
        <button @click='todoCreate'>todo생성</button> 
      </div>
        
    </div>
</template>

<script>

import { mapGetters, mapMutations, mapActions } from 'vuex'
import TabComponent from '~/components/todo/TabComponent.vue' //TabComponent 불러옴
import ListComponent from '~/components/todo/ListComponent.vue' //ListComponent 불러옴
import TodoModel from './TodoModel.js' //Model 불러옴
export default {
  components: {
    'tab': TabComponent,
    'list': ListComponent
  },
  mounted() {
    var user_id = this.$store.getters.userInfo._id;
    this.getTodoList(this.$store.getters.userInfo._id);
  },
  created() { //vue 인스턴스가 생성된 후에 실행됨
    this.selectedTab = this.tabs[0] //todo 탭 선택
    this.search() //todo list 출력
  },
  data() {
    return {
      active: false,
      value: null,
      query: '',
      tabs: ['todo', 'finish'],
      selectedTab: '',
      todoList: [],
      todoFormat2 : null,
      selected: null,
      options: [
        { value: null, text: '진행 중' },
        { value: 'a', text: '진행 전' },
        { value: 'b', text: '완료' },
        { value: {'C': '3PO'}, text: '실패' },
        // { value: 'd', text: 'This one is disabled', disabled: true }
      ]
    }
  },
  computed: {
    ...mapGetters({
      todoData: 'todoList'
    }),
    todoFormat: function () {
      // `this` 는 vm 인스턴스를 가리킵니다.
      // console.log(this.todoData)
      
      console.log(this.todoFormat2)
      return this.todoFormat2 = this.todoData
    }
  },
  methods : {
    ...mapActions({
      getTodoList: 'getTodoList'
    }),
    todoCreate() {
      this.$router.push('/todoList/create')
    },
    search() { //list 검색
      TodoModel.list(this.selectedTab).then(data => {
        this.todoList = data
      })
    },
    onClickTab(tab) { //tab 선택
      this.selectedTab = tab
      this.search()
    },
    onClickFinish(item) { //todo 완료
      TodoModel.finish(item)
      this.search()
    },
    onClickReset(item) { //완료된 todo 리셋
      TodoModel.reset(item)
      this.search()
    },
    onInputTodo(query) { //todo 입력
      TodoModel.add(query)
      this.selectedTab = this.tabs[0]
      this.search()
    }
  }
}
</script>

<style>
  .todo-wrap{
    margin: 0 auto;
    width: 80%;
    position: relative;
    top:100px;
  }

ul {
  list-style: none;
}
img {
  width: 100%;
}
.container {
  margin: 0 15px 0 15px;
}
header {
  border-bottom: 1px #ccc solid;
  padding: 10px 0  10px 0;
  text-align: center;
}
input[type=text] {
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 15px 0 15px 0;
  padding: 10px 15px;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid #cccccc;
}
.content {
  border: 1px solid #ccc;
}
ul.tabs {
  display: flex;
}
.tabs li {
  display: inline-block;
  width: 50%;
  padding: 15px;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  background-color: #eee;
  color: #999;
}
.tabs li.active {
  /* background-color: #2ac1bc; */
  background-color: #045FB4;
  color: #fff;
}
.list li {
  box-sizing: border-box;
  display: block;
  padding: 15px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.list li:last-child {
  border-bottom: none;
}
.list li .number{
  margin-right: 15px;
  color: #ccc;
}
.list li .date{
  position: absolute;
  right: 50px;
  top: 15px;
  margin-right: 15px;
  color: #ccc;
}
.list li .btn-remove{
  position: absolute;
  right: 0px;
  top: 15px;
  margin-right: 15px;
}
form {
  position: relative;
}
.btn-reset,
.btn-remove {
  border-radius: 15%;
  background-color: #ccc;
  color: white;
  border: none;
  padding: 2px 5px;
}
.btn-reset {
  position: absolute;
  top: 12px;
  right: 10px;
}
.btn-reset::before,
.btn-remove::before {
  content: 'add'
}
#search-result li {
  display: flex;
  margin-bottom: 15px;
}
#search-result img {
  width: 30%;
  height: 30%;
}
.todoBtn {
  float: right;
  margin: 2px;
}




</style>
