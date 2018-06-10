<template>
    <div>
      <leave-insert v-if="token && !isLeave"  v-b-modal.modal1 :userInfo="userInfo" />
      <div class='contain'>
        <main-banner :userInfo="userInfo" />
      </div>
      <!-- <main-progress v-if="userInfo" /> -->
      <!-- <calendar v-if="userInfo" /> -->
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
.contain {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  height: 500px;
  position: relative;
  top: 50px;
}
</style>
