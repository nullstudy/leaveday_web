<template>
    <div class='todo-wrap'>
      <section class="intro">
        <div class='todo-title-select'>
          <h1>TodoList
            <div class='todo-select'><b-form-select v-model="selected" :options="options"/></div></h1>
        </div>
      </section>

      <hr>

      <div v-for="(item,index) in showTodo" :key='item.title'>
        <li v-if="selected == item.status" class="list-group-item" @click="detailAtive(index)" >
          <strong>{{ item.title }}</strong> 
          {{ percent(item.detail) }}
          <button type="button" class="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
        </li>
        
        <br>

        <div class='content-tab' v-if="showTodo[index].active">
          <tab  :tabs="tabs" :selected-tab="selectedTab" :showIndex="index" v-on:@change="onClickTab"></tab>         
          <list :selected-tab="selectedTab" :data="showTodo[index].detail" :showIndex="index" v-on:@finish="onClickFinish" v-on:@reset="onClickReset"></list> 
        </div>
        
      </div>




    </div>
</template>

<script>

import { mapGetters, mapMutations, mapActions ,mapState } from 'vuex'
import TabComponent from '~/components/todo/TabComponent.vue' //TabComponent 불러옴
import ListComponent from '~/components/todo/ListComponent.vue' //ListComponent 불러옴
export default {
  async asyncData (context) {    
    await context.store.dispatch('todo/getTodoList',context.store.getters.userInfo._id) // todoList, showTodo 불러오기 
  },
  components: {
    'tab': TabComponent,
    'list': ListComponent
  },
  created() { 
    this.selectedTab = this.tabs[0]; //todo 탭 선택
  },
  data() { 
    return {
      tabs: ['todo', 'finish'],
      selectedTab: '',
      selected: 1,
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
      token : 'token',
      showTodo: 'todo/showTodoList'
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
    },

    onClickTab(data) { //tab 선택
      this.selectedTab = data.tab
    },

    onClickFinish(data) { //todo 완료
      this.$store.commit('todo/SET_CHANGTOTALTODO', {  status : true , index : data.index , _id : data._id });
      this.$store.commit('todo/SET_SHOWTODO'); 
      
      let updateData = {
        detail_id : data._id,
        todo : data.todo,
        status : true
      }
      this.setHeader(this.token);
      this.putTodo(updateData);
    },
    onClickReset(data) { //완료된 todo 리셋
      this.$store.commit('todo/SET_CHANGTOTALTODO', { status : false , index : data.index , _id : data._id});
      this.$store.commit('todo/SET_SHOWTODO'); 
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
    },
    dateFormat(date){
      var month = date.getMonth()+1;
      month = month >= 10 ? month : '0' + month;  // month 두자리로 저장
      var day = date.getDate();
      day = day >= 10 ? day : '0' + day;  //day 두자리로 저장
      var year = date.getFullYear();
      return  year + '.' + month + '.' + day;
    },
    percent(detail){
      let count = 0;
      for(var item in detail){
        if(detail[item].status === true) count++
      }
      return  Math.floor((count / detail.length) * 100) +'%'
    }    
  }
  // ( {{ dateFormat(new Date(item.startDT)) }} ~ {{ dateFormat(new Date(item.endDT)) }})
}
</script>

<style>
  /* @import 'bootstrap/dist/css/bootstrap.css'; */
  /* @import 'bootstrap-vue/dist/bootstrap-vue.css'; */
.todo-select{
  display: inline;
  float: right;
  widtH: 85%;
  position: relative;
  bottom: 2px;  
}

.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url("~assets/images/main-page-background.jpg");
  background-position: center;
  background-size: cover;
}

.intro h1 {
  float: right;
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

.todo-wrap{
  /* display: flex; */
  position: relative;
  margin: 0 auto;
  width: 100%;
  top:100px;
}

ul {
  list-style: none;
}

.content-tab{
    position: relative;
    right: 20px;
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

.todoBtn {
  float: right;
  margin: 2px;
}
</style>
