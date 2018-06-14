<template>
    <div class='todo-wrap'>
      <div>
        <todo-selected/>
      </div>
      <div>
        <!-- <todo-result>출력</todo-result> -->
      </div>
      <div>
        <button @click='todoCreate'>todo생성</button> 
      </div>
        
    </div>
</template>

<script>

import { mapGetters, mapMutations, mapActions } from 'vuex'
import TodoSelected  from '~/components/todo/Selected'

export default {
  mounted() {
    var user_id = this.$store.getters.userInfo._id;
    this.todoList(this.$store.getters.userInfo._id);
  },
  components: {
    TodoSelected
  },
  data: () => ({
    active: false,
    value: null
  }),
  methods : {
    todoCreate() {
      this.$router.push('/todoList/create')
    },
    ...mapActions({
      todoList: 'getTodoList'
    })
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
</style>
