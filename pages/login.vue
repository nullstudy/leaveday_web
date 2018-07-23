<template>
    <section class="container">
      <div class='loginButton'>
        <b-button  id='google' variant="primary" :href="GOOGLE_AUTHURL" style='color : white'>google Login</b-button>
      </div>
      <div class='loginButton' >
        <b-button id='kakao' variant="primary" :href="KAKAO_AUTHURL" style='color : white'>kakao Login</b-button>  
      </div>
    </section>
</template>
<script>
import axios from 'axios'

export default {
    data () {      
        return {
            GOOGLE_AUTHURL: process.env.BACKEND_URL+'/auth/google',
            KAKAO_AUTHURL: process.env.BACKEND_URL+'/auth/kakao'
        }
    },
    methods : {
       async login() {
        await axios.get(process.env.BACKEND_URL + '/auth/google')
          .then(response => {     
              console.log('로그인결과',response)
          }).catch(err => {
              console.error(err);
          })
      }
    }
}
</script>

<style>


.loginButton {
  margin : 10px;
}

#google,#kakao{
  text-align: center;
  vertical-align: middle;
  width: 270px;
  height: 80px;
  font-size: 35px;
  margin: 0 auto;
}


.container {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}


</style>
