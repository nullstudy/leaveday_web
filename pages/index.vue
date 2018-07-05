<template>
    <div>
      <leave-insert v-if="token && !isLeave"  v-b-modal.modal1 :userInfo="userInfo" />
      <div class='main-content-banner'>
        <main-banner :userInfo="userInfo" />
      </div>
      
      <calendar v-if="userInfo" />
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
.main-content-banner {
  margin: 0 auto;
  width: 80%;
  height: 100%;
  position: relative;
  top: 40px;
}
</style>
