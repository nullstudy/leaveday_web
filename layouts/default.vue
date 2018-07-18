<template>
  <div class='wrap'>
    <toolbar :isAuthenticated="isAuthenticated"/> 
    <div class="container">
      <nuxt/>
    </div>  
  </div>
</template>

<script>
  import Toolbar from '../components/Toolbar'
  import { mapGetters,mapMutations } from 'vuex'
  export default {
    computed: mapGetters({
      isAuthenticated:'isAuthenticated',      
    }),
    components: {
      Toolbar
    }
  }
</script>

<style >  
  body {
    height: 100%;
    background-color : #D1D5DA;
    
  }
  .wrap {
    width:100%;
    height: 100%;
  }
  .container{
    /* width:120%; */
    height: 100%;
    margin: 0 auto;
    background-color: white;     
  }
</style>
