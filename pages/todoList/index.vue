<template>
    <div class='wrap-todo'>
        <button @click='todoCreate'>todo생성</button> 
    </div>
    
</template>

<script>
  
  export default {
    name: 'TodoList',
    data: () => ({
      active: false,
      value: null
    }),
    methods : {
      todoCreate() {
        this.$router.push('/todoList/create')
        
      }
    }
  }
  
</script>

<style>
  .wrap-todo{
    position: relative;
    top:100px;
  }
</style>
