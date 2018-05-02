<template>
  <div class='wrap'>
      <div  id='header_nav'>
        <div>
            <ul>
                <li>메인</li>
                <li>leaveday</li>
                <li>login</li>
            </ul>
            
        </div>
      </div>

      <div class='content'>
          content
      </div>

      <div class='footer'>
          footer
      </div>
  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
// import axios from 'axios';

export default {     
    async asyncData(req) {
        let { data } = await axios.get(process.env.BACKEND_URL + '/test2'); 
        console.log('data',data)
                                                                                       
    },
    mounted() {
        
    },
    computed: {
        
    },
    methods: {
     
    }
}


</script>

<style>
    #header_nav {
        width:100%;
        height: 50px;
        overflow:hidden;
        background-color:#2d1152;
        line-height: 50px;
    }

    #header_nav li{
        font-size:1.5em;
        color:#ffffff;
        margin-right:20px;
        list-style:none;
        float:left;
    }

    #header_nav li:nth-child(3) {
        float:right;
    }
</style>
