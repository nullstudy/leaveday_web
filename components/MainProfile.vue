<template>
    <div>
        <div class='mian_profile'>
            <img  id='profile_image' style="cursor:pointer" @click="imageUpload()"  class='main_profile_el' v-bind:src="image" alt="프로필 사진">
            <p class='main_profile_el' > 이름 : {{ this.userInfo.name }}</p>
            <p class='main_profile_el' > 이메일 : {{ this.userInfo.email }}</p>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {     
    props: ['userInfo'],
    data() {
        return {
            image : this.userInfo.image,
            name : this.userInfo.name,
            email : this.userInfo.email
        }
    },
    computed: {
      ...mapGetters({
        
      })
    },
    methods : {
        imageUpload() {
            alert('gg')
        }
    }
}

</script>

<style>
    .mian_profile {
        float: right;
        /* border: 1px solid black; */
    }
    .main_profile_el{
        /* border: 1px solid red; */
        line-height: 50px;
        float: left;
    }
</style>
