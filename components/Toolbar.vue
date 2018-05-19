<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info" class='navbar1'>
      <b-navbar-toggle target="nav_collapse" toggleable></b-navbar-toggle>
      <b-navbar-brand href="/">LeaveDay</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="/todoList">TodoList</b-nav-item>
        </b-navbar-nav>
        <!-- 로그인 -->
        <b-navbar-nav v-if='isAuthenticated' class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">프로필</b-dropdown-item>
            <b-dropdown-item v-b-modal.modal1 >리스트</b-dropdown-item>
            <b-dropdown-item href="#" @click="onLogout" >로그아웃</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!-- 비로그인 -->
        <b-navbar-nav v-else class="ml-auto">
          <b-nav-item href="login">login</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <leavecreate :userInfo="userInfo"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { unsetToken } from '~/util/auth'
  import Leavecreate from "./../components/LeaveModal.vue"

  
  export default  {
    props: ['isAuthenticated'],
    components : {
      Leavecreate
    },
    data()  {
      return {
        
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
        this.$store.commit('SET_USER',{ name :null,email :null})
        this.$store.commit('SET_TOKEN', {token : null})
        // let { data } = await axios.get(process.env.BACKEND_URL + '/logout');
      }
    }
  }
</script>

<style>
 
</style>
