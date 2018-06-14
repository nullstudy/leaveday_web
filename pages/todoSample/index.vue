<template>
  <div class='wrap-todo'>
    <header>
      <h2 calss="container">Todo</h2>
    </header>
 
    <div calss="container">
      <add-form v-bind:value="query" v-on:@submit="onInputTodo"></add-form>
      <!-- FormComponent.vue에서 inputValue에 넣어준 value를 v-bind가 App.vue의 query와 바인딩해줌 -->
      <!-- v-on:@submit => FormComponent.vue에서 $emit으로 전달한 @submit이라는 이벤트를 받아와서 onInputTodo 메서드와 연결 -->
      <tab v-bind:tabs="tabs" v-bind:selected-tab="selectedTab" v-on:@change="onClickTab"></tab>
    </div>
 
    <div>
      <list v-bind:selected-tab="selectedTab" v-bind:data="todoList"
        v-on:@finish="onClickFinish"
        v-on:@reset="onClickReset"></list>
    </div>
 
  </div>
</template>
 
<script>
//FormComponent 불러옴
import FormComponent from '~/components/todoSample/FormComponent.vue'
//TabComponent 불러옴
import TabComponent from '~/components/todoSample/TabComponent.vue'
//ListComponent 불러옴
import ListComponent from '~/components/todoSample/ListComponent.vue'
 
//Model 불러옴
import TodoModel from './TodoModel.js'
 
export default {
  data () {
    return {
      query: '',
      tabs: ['todo', 'finish'],
      selectedTab: '',
      todoList: []
    }
  },
  created() { //vue 인스턴스가 생성된 후에 실행됨
    this.selectedTab = this.tabs[0] //todo 탭 선택
    this.search() //todo list 출력
  },
  components: { //사용할 컴포넌트 등록
    'add-form': FormComponent,
    'tab': TabComponent,
    'list': ListComponent
  },
  methods: {
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
body, ul {
  margin: 0;
  padding: 0;
}

.wrap-todo{
    position: relative;
    top:68px;
    width: 80%;
    margin: 0 auto;
    background: white;
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