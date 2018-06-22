<template>
  <b-navbar toggleable="md" type="dark" variant="info" class='navbar1'>
    <b-navbar-toggle target="nav_collapse" toggleable></b-navbar-toggle>
    <b-navbar-brand href="/" v-bind:style="[decoration,colorOption2]">LeaveDay</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="/todoList" v-bind:style="[decoration,colorOption2]">TodoList</b-nav-item>
        <b-nav-item href="/jobDiary" v-bind:style="[decoration,colorOption2]">JobDiary</b-nav-item>
      </b-navbar-nav>
      <!-- 로그인 -->
      <b-navbar-nav v-if='isAuthenticated' class="ml-auto">
        <b-nav-item-dropdown right class='nav_u_drop'>
          <template slot="button-content">
            <em>User</em>
          </template>
            <b-dropdown-item href="#" v-bind:style="[decoration,colorOption1]">프로필</b-dropdown-item>
            <b-dropdown-item v-b-modal.modal1  v-bind:style="[decoration,colorOption1]">리스트</b-dropdown-item>
            <b-dropdown-item href="#" @click="onLogout" v-bind:style="[decoration,colorOption1]">로그아웃</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <!-- 비로그인 -->
      <b-navbar-nav v-else class="ml-auto">
        <b-nav-item href="login">login</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <!-- <leavecreate :userInfo="userInfo"/> -->
</template>

<script>
  import { mapGetters } from 'vuex'
  import { unsetToken } from '~/util/auth'
  import Leavecreate from "./../components/LeaveModal.vue"
  import BootstrapVue from '~/plugins/bootstrap-vue'
  export default  {
    props: ['isAuthenticated'],
    components : {
      Leavecreate
    },
    data()  {
      return {
        decoration : {
          'text-decoration' : 'none'
        },
        colorOption1 : {
          'color' : 'black'
        },
        colorOption2 : {
          'color' : 'white'
        }
      }
    },
    computed: {
      ...mapGetters({
        token : 'token',
        userInfo : 'userInfo'
      }) 
    },
    methods: {
      async onLogout (e) {
        unsetToken();
        // console.log(localStorage.createPersistedState(storage.removeItem('vuex')))
        this.$store.commit('SET_USER',{ userInfo :null })
        this.$store.commit('SET_TOKEN', { token : null })
        this.$store.commit('SET_DIARYDETAIL', { diaryDetail : {} })
        
        
        this.$router.push('/login');
        
        // let { data } = await axios.get(process.env.BACKEND_URL + '/logout');
      }
    }
  }
</script>

<style>
    @import 'bootstrap/dist/css/bootstrap.css';
    @import 'bootstrap-vue/dist/bootstrap-vue.css';
    .navbar1 {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1;
    }    
    .nav_u_drop{
      position: relative;
      z-index: 200;
    }
</style>
