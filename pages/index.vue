<template>
    <div>
        <calendar/>
        <Leave-insert v-if="token && !isLeave"  v-b-modal.modal1 :userInfo="userInfo"  />
    </div>
</template>

<script>
import { setToken } from '~/util/auth'
import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Calendar from '../components/Calendar'
import LeaveInsert from "../components/LeaveInsert.vue"

export default {   
    mounted() {

    },
    computed: {
      ...mapGetters({
        token : 'token',
        userInfo : 'userInfo',
        isLeave : 'isLeave'
      })
    },  
    components: {
      Calendar,LeaveInsert
    }
}
</script>

<style>
   
</style>
