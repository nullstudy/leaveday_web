<template>
    <div class='wrap-diary-detail'>
        <div class="section_wrap section_bottom_0">
            <div class="section_bottom">
                <div class="section-diary-title">
                    <h2>{{ diary.title }}</h2>
                </div>
            </div>

            <ul class="wt_box gray_color">
                <li>
                    <a>{{ userInfo.name }}</a>
                </li>
                <li>
                    <a><span><b>{{ diary.state.state }}</b></span></a>
                </li>				
                <li>
                    <a>leaveCount<span><b> {{ diary.leaveCount }}</b></span></a>
                </li>								
                <li>
                    <a href="#">댓글 <span><b>2</b></span></a>
                </li>
                <li class="right">
                    <a>조회 수 <span><b>{{ diary.views }}</b></span></a>
                </li>
                <li class="right">
                    <a><span>{{ diary.date }}</span></a>
                </li>
            </ul>
        </div>

        <div class="section_wrap section_border_0">                
            <div class="diary-content">
                {{ diary.content }}
            </div>
        </div>

        <ul class="wt_box gray_color diary-footer">
            <li class="right"><a href='/jobDiary' >목록</a></li>
            <li class="right"><a href="/jobDiary/edit">수정</a></li>
            <li class="right"></li>
            <li class="right"></li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    
    export default  {
        async mounted() {
           await axios.get( process.env.BACKEND_URL +'/jobDiary/detail/'+this.$route.params.id).then( 
                res => {
                   return  this.$store.commit('diary/SET_DIARYDETAIL',{ diaryDetail : res.data.data[0] })
                }
            ).catch(err => {
                console.log(err)
            })
        },
        computed: {
            ...mapGetters({
                diary : 'diary/diaryDetail',
                token : 'token',
                userInfo : 'userInfo',
                
            })
        }
    }
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';

body{
    background: #fcfcfc;
}
.section_bottom{
    position: relative;
    border: 1px solid #E7E7E7;
    margin-top: 2%;
}
.section-diary-title{
    padding: 2%;
}
.wrap-diary-detail, .wrap-diary-detail a {    
    text-decoration: none;
    color: #4e4e4e;
}
.wt_box {
    position: relative;
    list-style: none;
    padding: 0;
    margin: 0;
    border: 0;
}
.wt_box li a {
    display: inline-block;
    padding: 10px 15px;
}

.wt_box li.right {
    float: right;
    border: 0;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
}
.wt_box:after {
    content: "";
    display: block;
    clear: both;
}
.wt_box li {
    float: left;
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
}
.gray_color {
    background: #fcfcfc;
}

/* 내용  */
.diary-content{
    border: 1px solid #ddd;
    position: relative;
    padding: 4%;
    height: 300px;
}
    
.section_border_0 {
    border-top: 0;
}

div {
    display: block;
}

.diary-footer{
    border-top: 0;
    border: 1px solid #E7E7E7
}
</style>
