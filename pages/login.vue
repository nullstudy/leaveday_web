<template>
    <div>
        <section>
            <a variant="primary" :href="FACEBOOK_AUTHURL">Facebook Login</a>              
        </section>
        <section>
            <a variant="primary" :href="GOOGLE_AUTHURL">google Login</a>     
        </section>
        <section>
            <a variant="primary" :href="KAKAO_AUTHURL">kakao Login</a>     
        </section>
     </div>
</template>
<script>
import axios from 'axios'

export default {
    asyncData(){
        console.log(process.env.BACKEND_URL)
    },
    data () {      
        return {
            FACEBOOK_AUTHURL: process.env.BACKEND_URL+'/auth/facebook',
            GOOGLE_AUTHURL: process.env.BACKEND_URL+'/auth/google',
            KAKAO_AUTHURL: process.env.BACKEND_URL+'/auth/kakao'
        }
    } 
}
</script>

<style>
.container {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
