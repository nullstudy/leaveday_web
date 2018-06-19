<template>
    <div class='todo-wrap'>
      <div>
        <b-form-select v-model="selected" :options="options" class="mb-3" />
      </div>
      
      <div calss="todo-container">
        <div v-for="(item,index) in todoData">
          <div v-show="false">{{ activeOption }}</div>
          <li v-if="selected == item.status" class="list-group-item" @click="detailAtive(index)" >{{ item.title }}
            <button type="button" class="close" aria-label="Close" @click="deleteDetail(index)">
                <span aria-hidden="true">&times;</span>
            </button>
          </li>
          
          <div v-if="selected == item.status && todoActive[index].active">
            <tab :tabs="tabs" :selected-tab="selectedTab" :i="index" v-on:@change="onClickTab"></tab>
            <list :selected-tab="selectedTab" :data="item.detail" :i="index"
            v-on:@finish="onClickFinish"
            v-on:@reset="onClickReset"></list>  
            <!-- <li v-for="detail in item.detail">  
              {{ detail.todo }}
            </li> -->
          </div>
        </div>

         <!-- <tab v-bind:tabs="tabs" v-bind:selected-tab="selectedTab" v-on:@change="onClickTab"></tab> -->
          <!-- <list v-bind:selected-tab="selectedTab" v-bind:data="item.details"
          v-on:@finish="onClickFinish"
          v-on:@reset="onClickReset"></list> -->

        <!-- </div> -->
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
// import TodoModel from './TodoModel.js' //Model 불러옴
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
    // this.search() //todo list 출력
  },
  data() {
    return {
      active: false,
      value: null,
      tabs: ['todo', 'finish'],
      selectedTab: '',
      todoList: [],
      todoActive: [],
      selected: '진행 중',
      options: [
        { value: 1, text: '진행 중' },
        { value: 2, text: '진행 전' },
        { value: 3, text: '완료' },
        { value: 4, text: '실패' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      todoData: 'todoList'
    }),
    activeOption : function(item) {
      for(var data in this.todoData){
        this.todoActive.push({ active : false }) 
        this.todoList.push(item.todoData[data].detail)
      }
      return   
    } 
  },
  methods : {
    ...mapActions({
      getTodoList: 'getTodoList'
    }),
    todoCreate() {
      this.$router.push('/todoList/create')
    },
    detailAtive(index) {
      this.todoActive[index].active ? this.todoActive[index].active = false : this.todoActive[index].active = true ;
    },

    search(i) { //list 검색
      let data = this.todoList
      this.list(this.selectedTab,i).then((data) => {
        console.log('search',data)
        // this.todoList = data
      })
    },
    onClickTab(tab,i) { //tab 선택
      this.selectedTab = tab
      console.log('tab',this.selectedTab)
      this.search(i)
    },
    onClickFinish(item,i) { //todo 완료
      // this.finish(item,i)
      // this.search(i)
    },
    onClickReset(item,i) { //완료된 todo 리셋
      // this.reset(item,i)
      // this.search(i)
    },

    list(tab,i) {
      // return new Promise(res => {
      //   if(tab === 'todo') res(this.todoList[i].filter(item => item.status === true))
      //   if(tab === 'finish') res(this.todoList[i].filter(item => item.status === false))
      // })
    }, 
    finish(index,i) {
      // this.todoList[i].detail.filter(item => item.status === true)[index].status = false
    },
   
    reset(index,i) {
      // this.todoList[i].detail.filter(item => item.status === false)[index].status = true
    },
   
    remove(todo,i) {
      // this.todoList[i].detail = this.todoList[i].filter(item => item.todo !== todo)
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
