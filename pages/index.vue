<template>
    <div class='wrap'>
      <div class='content'>
          content
      </div>

      <div class='footer'>
          footer
      </div>
    </div>
</template>

<script>
import { setToken } from '~/util/auth'
import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {     
    async asyncData(req) {
        let { data } = await axios.get(process.env.BACKEND_URL + '/test2'); 
        console.log('data',data)                                                                 
    },
    mounted() {
        
    },
    computed: {
      ...mapGetters({
        isAuthenticated: 'isAuthenticated',
        token : 'token'
      })
    },
    methods: {
        ...mapMutations({
            setUser: 'SET_USER',
            setAuth: 'SET_AUTH'
        })
    }
}


</script>

<style>
    
</style>
