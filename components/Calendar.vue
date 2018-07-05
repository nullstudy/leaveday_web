<template>
<div>
    <no-ssr class='main-calendar'>
        <full-calendar :events="demoEvents" ></full-calendar>
    </no-ssr>
</div>
</template>

<script>

import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { setCookie } from '~/util/auth'

export default {     
    data() {
        return {
            demoEvents : [
                {
                    title : '입사일',
                    start : '2018-05-01',
                    end : '2018-05-07',
                    cssClass : 'class1'
                },
                {
                    title : '우울한 날',
                    start : '2018-05-01',
                    end : '2018-05-03',
                    cssClass : 'class2'
                },
                {
                    title : '치킨의 날',
                    start : '2018-05-21',
                    end : '2018-05-21',
                    cssClass : 'class3'
                },
                {
                    title : '퇴사일',
                    start : '2018-05-27',
                    end : '2018-05-27',
                    cssClass : 'class4'
                }
            ]
        }
    }
}


</script>

<style>
    .class1{
        color: black !important;
        background-color: green !important;
    }
    .class2{
        color: white  !important;
        background-color: red !important;
    }
    .class3{
        color: black !important;
        background-color: yellow !important;
    }
    .class4{
        color: black !important;
        background-color: gray !important;
    }
    .class1:onclick {
        color: red !important;
        background-color: red !important;
    }
    .main-calendar{
        border: 1px solid red;
        position: relative;
        top:30px;
    }
</style>
