<template>
  <div>
      <toolbar :isAuthenticated="isAuthenticated"/>
      <nuxt/>
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

</style>
