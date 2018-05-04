<template>
    <section class="container">

      <div class='loginButton'>
        <b-button  id='google' variant="primary" :href="GOOGLE_AUTHURL">google Login</b-button>
      </div>
      <div class='loginButton' >
        <b-button id='kakao' variant="primary" :href="KAKAO_AUTHURL">kakao Login</b-button>  
      </div>
    </section>
</template>
<script>
import axios from 'axios'

export default {
    asyncData(){
        // console.log(process.env.BACKEND_URL)
    },
    data () {      
        return {
            GOOGLE_AUTHURL: process.env.BACKEND_URL+'/auth/google',
            KAKAO_AUTHURL: process.env.BACKEND_URL+'/auth/kakao'
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
