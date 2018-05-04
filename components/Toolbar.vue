<template>
  <div id='header_nav'>
    <ul>
      <li><a href="/">LeaveDay</a></li>
      <li><a href="/main">게시판</a></li>
      <div v-if= isAuthenticated  id='right' >
        <!-- <b-dropdown id="ddown-aria"  text="User" variant="light">
          <div role="group" aria-labelledby="header2">
            <b-dropdown-item-button aria-describedby="header2" href='/login'>프로필</b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="header2" href='/login'>로그아웃</b-dropdown-item-button>
          </div>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item-button>공지사항</b-dropdown-item-button>
        </b-dropdown> -->
        <div class="navbar">
          <div class="dropdown">
            <button class="dropbtn">User 
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="#">회원정보</a>
              <a href="#">내가쓴글</a>
              <a href="#" @click="onLogout" >로그아웃</a>
            </div>
          </div> 
        </div>




      </div>
      
      <div v-else class='right'>
        <li><a href="/login" class='login'>login</a></li>
      </div>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { setToken,unsetToken } from '~/util/auth'
  
  export default  {
    props: ['isAuthenticated'],

    mounted() {
      console.log(this.token)
      // setToken(this.token);
    },
    data()  {
      return {
        styleObject : {
          'border' : 'none',
          'background' : 'inherit'
        }
      }
    },
    computed: {
      ...mapGetters({
        token : 'token'
      })
    },
    methods: {
      async onLogout (e) {
        unsetToken();
        this.$store.commit('SET_USER',{ name :null,email :null})
        this.$store.commit('SET_TOKEN', {token : null})
        // let { data } = await axios.get(process.env.BACKEND_URL + '/logout');
      },
      info() {
        return this.username+'('+this.email+')'
      },
      lectorReq(){
        window.open('/lectorReq' ,"a", "width=400, height=530, left=100, top=50");
      }
    }
  }
</script>

<style>
  #header_nav {
      width:100%;
      height: 50px;
      overflow:hidden;
      background-color:#7952b3;
      line-height: 50px;
  }

  #header_nav li{
      font-size:0.9em;
      color:#ffffff;
      margin-right:20px;
      list-style:none;
      float:left;
  }
  #header_nav a {
    text-decoration-line: none; 
    color:#ffffff;
  }
  
  #right,.login {
    position: absolute;
    display: inline;
    left : 94.5%;
    float:right; 
    
  }



  .navbar {
      background-color: inherit;
      font-family: Arial, Helvetica, sans-serif;
      position: relative;
      bottom: 9px;
  }

  .navbar a {
      float: left;
      font-size: inherit;
      color: white;
      text-align: center;
      text-decoration: none;
  }

  .dropdown {
      float: left;
      overflow: hidden;
  }

  .dropdown .dropbtn {
      border: none;
      outline: none;
      color: white;
      padding: auto auto;
      background-color: inherit;
      font-family: inherit;
  }

  .navbar a:hover, .dropdown:hover .dropbtn {
      background-color: inherit;
  }

  .dropdown-content {
      display: none;
      background-color: gray;
      min-width: 100px;
      z-index: 1;
  }

  .dropdown-content a {
      float: none;
      color: inherit;
      padding: 12px 16px;
      text-decoration: none;
      height: 50px;
      display: block;
      text-align: center;
      line-height: 25px;
  }

  .dropdown-content a:hover {
      background-color: #ddd;
  }

  .dropdown:hover .dropdown-content {
      display: block;
  }
  
</style>
