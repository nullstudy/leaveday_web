<template>

    <div>
      <leave-insert v-if="token && !isLeave"  v-b-modal.modal1 :userInfo="userInfo" />
      <!-- <div class='main-content-banner'> -->
        <div>
          <main-banner :userInfo="userInfo" />

          <calendar v-if="userInfo" />    
        </div>
      <!-- </div> -->
      <!-- <div class='main-calendar'> -->
        
      <!-- </div> -->
    </div>

      


</template>

<script>
import { setToken } from '~/util/auth'
import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Calendar from '../components/Calendar'
import LeaveInsert from "../components/LeaveInsert.vue"
import MainBanner from '../components/MainBanner'

export default {   
    data(){
      return {
      
      }
    },
    computed: {
      ...mapGetters({
        token : 'token',
        userInfo : 'userInfo',
        isLeave : 'isLeave'
      })
    },  
    components: {
      Calendar,LeaveInsert,MainBanner
    }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';

</style>
