<template>
  <div class='wrap'>
    <toolbar :isAuthenticated="isAuthenticated"/>
    <!-- <div class='contain'> -->
      <nuxt/>
    <!-- </div> -->
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

<style>
  body {
    background-color : #D1D5DA;
  }
</style>
