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
      isAuthenticated:'isAuthenticated'
    }),
    // methods: {
    //     ...mapMutations({
    //         setUser: 'SET_USER',
    //         setAuth: 'SET_AUTH'
    //     })
    // },
    components: {
      Toolbar
    }
  }
</script>

<style>

</style>
