<template>

    <div>
      <!-- <leave-insert v-if="token && !isLeave"  v-b-modal.modal1 :userInfo="userInfo" /> -->
      
      <div class='main-content-profile'>
        <!-- <main-banner :userInfo="userInfo" /> -->
      </div>
      <div class='main-content-calendar'>
          <!-- <calendar />     -->
      </div>
    </div>

</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Calendar from '../components/Calendar'
import LeaveInsert from "../components/LeaveInsert.vue"
import MainBanner from '../components/MainBanner'

export default {   
    mounted(req) {
      // console.log(req)
      // setCookie(res.data.data)
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
