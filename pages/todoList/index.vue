<template>
    <div class='todo-wrap'>
      <div>
        <b-form-select v-model="selected" :options="options" class="mb-3" />
      </div>
    
      <div v-for="(item,index) in showTodo" :key='item.title'>
        <li v-if="selected == item.status" class="list-group-item" @click="detailAtive(index)" >{{ item.title }}
          <button type="button" class="close" aria-label="Close" @click="deleteDetail(index)">
              <span aria-hidden="true">&times;</span>
          </button>
        </li>

        <div class='content-tab' v-if="showTodo[index].active">
          <tab  :tabs="tabs" :selected-tab="selectedTab" :i="index" v-on:@change="onClickTab"></tab>   
          <list :selected-tab="selectedTab" :data="showTodo[index].detail" :i="index" v-on:@finish="onClickFinish" v-on:@reset="onClickReset">
          <!-- <list :selected-tab="selectedTab" :data="value" :i="index" v-on:@finish="onClickFinish" v-on:@reset="onClickReset">   -->
          </list>  
        </div>
  
      </div>
      <hr>
    </div>
</template>

<script>

import { mapGetters, mapMutations, mapActions ,mapState } from 'vuex'
import TabComponent from '~/components/todo/TabComponent.vue' //TabComponent 불러옴
import ListComponent from '~/components/todo/ListComponent.vue' //ListComponent 불러옴
export default {
  components: {
    'tab': TabComponent,
    'list': ListComponent
  },
  async asyncData ({store}) {    
    // await store.dispatch('getTodoList', store.getters.userInfo._id )
    // console.log(store.getters.todoList)
  },
  created() { //vue 인스턴스가 생성된 후에 실행됨
    var user_id = this.$store.getters.userInfo._id;
    this.getTodoList(this.$store.getters.userInfo._id);
    this.selectedTab = this.tabs[0]; //todo 탭 선택
  },
  mounted(){
  },
  data() { 
    return {
      tabs: ['todo', 'finish'],
      selectedTab: '',
      selected: 1,
      value: null,
      options: [
        { value: 1, text: '진행 중' },
        { value: 2, text: '진행 전' },
        { value: 3, text: '완료' },
        { value: 4, text: '실패' }
      ]
    }
  },
  watch : {
    selected : function() { 
      this.selectedTab = this.tabs[0] //todo 탭 선택
      this.$store.commit('todo/SET_SELECT',{ select : this.selected });
      this.$store.commit('todo/SET_SHOWTODO');
    }
  },

  computed: {
    ...mapGetters({
      showTodo: 'todo/showTodoList',
      token : 'token'
    })
  },
  methods : {
    ...mapActions({
      setHeader: 'setHeaderAuth',
      getTodoList: 'todo/getTodoList',
      putTodo: 'todo/putDetailTodo'
    }),
    todoCreate() {
      this.$router.push('/todoList/create')
    },
    detailAtive(index) {
      let activeIndex  = this.showTodo[index].active  
      let id  = this.showTodo[index]._id
      this.$store.commit('todo/SET_CHANGETODO', { active : activeIndex, id : id }); 
      // this.search(index);
    },

    search(i) { //list 검색
      // this.list(this.selectedTab,i);
      // this.value = showTodo[i].detail
      // this.value = this.list(this.selectedTab,i);
    },
    list(tab,i) {
      // if(tab === 'todo') 
      //   return this.showTodo[i].detail.filter( item => item.status === false)
        
      // if(tab === 'finish') 
      //   return this.showTodo[i].detail.filter( item => item.status === true)
    },
    onClickTab(data) { //tab 선택
      this.selectedTab = data.tab
      // this.search(data.index)
    },

    onClickFinish(item) { //todo 완료
      this.finish(item)
    },
    onClickReset(item) { //완료된 todo 리셋
      this.reset(item)
    }, 
    finish(data) {
      // this.search(data.index);
      this.$store.commit('todo/SET_CHANGTOTALTODO', {  status : true , index : data.index , _id : data._id }); 
      // this.search(data.index) 
      let updateData = {
        detail_id : data._id,
        todo : data.todo,
        status : true
      }
      this.setHeader(this.token);
      this.putTodo(updateData);
    },
   
    reset(data) {
      // this.search(data.index);
      this.$store.commit('todo/SET_CHANGTOTALTODO', { status : false , index : data.index , _id : data._id});
      // this.search(data.index)  
      // this.$store.commit('todo/SET_SHOWTODO'); 
      let updateData = {
        detail_id : data._id,
        todo : data.todo,
        status : false
      }
      this.setHeader(this.token);
      this.putTodo(updateData);
    },
    remove(todo,i) {
      // this.todoList[i].detail = this.todoList[i].filter(item => item.todo !== todo)
    }    
  }
}
</script>

<style>
  @import 'bootstrap/dist/css/bootstrap.css';
  @import 'bootstrap-vue/dist/bootstrap-vue.css';
.todo-wrap{
  position: relative;
  margin: 0 auto;
  width: 80%;
  top:100px;
}

ul {
  list-style: none;
}
img {
  width: 100%;
}
.content-tab{
    position: relative;
    
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
