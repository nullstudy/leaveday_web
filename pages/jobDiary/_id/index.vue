<template>
    <div class='wrap-diary-detail'>
        <div class="section_wrap section_bottom_0">
            <div class="section_bottom">
                <div class="section-diary-title">
                    <h2 class='diary-title'>{{ diary.title }}</h2>
                </div>
            </div>

            <ul class="wt_box-web wt_box gray_color">
                <li>
                    <a>{{ userInfo.name }}</a>
                </li>
                <li>
                    <a><span><b>{{ diary.state.status }}</b></span></a>
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

            <ul class="wt_box-real">
                <li>
                    <a>{{ userInfo.name }}</a>
                </li>
                <li>
                    <a><span><b>{{ String(diary.state.status) }}</b></span></a>
                </li>								
                <li>
                    <a >조회 수 <span><b>{{ diary.views }}</b></span></a>
                </li>
                <li>
                    <a class="real_box_date"><span>{{ diary.date }}</span></a>
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
        async created() {
           await axios.get( process.env.BACKEND_URL +'/jobDiary/detail/'+this.$route.params.id).then( 
                res => {
                   return  this.$store.commit('diary/SET_DIARYDETAIL',{ diaryDetail : res.data.data[0] })
                }
            ).catch(err => {
                new error('fail')
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
.diary-title{
    font-size: 1.5rem;
}
.wrap-diary-detail, .wrap-diary-detail a {    
    text-decoration: none !important;
    color: #4e4e4e !important;
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

@media (max-width: 768px) {
    .wt_box-web {
        display:none !important;
    }
    .wt_box-real {
        display:show;
        position: relative;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
        list-style: none;
        padding: 0;
        margin: 0;
        
    }
    .wt_box-real {
        display: block;
    }
    
    .wt_box-real li a {
        display: inline-block;
        padding: 10px 15px;
        font-size:0.7rem;
        border-right: 1px solid #ddd;
    }

    .wt_box-real li {
        clear: both;
        display: inline;
        float: none;
        border: 0;
    }        
    .real_box_date{
        width:124px;
        text-align: center;
        border-right: 0 !important;
    }
}
@media (min-width: 768px) {
    .wt_box-real {
        display:none;
    }
}
</style>
