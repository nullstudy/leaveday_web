<template>
    <div class='wrap-jobdiary'>
        <div class="breadcrumb" style="" ><span class="left">
            <a href="/jobdiary" class='content-title' style="color:black; text-decoration: none;"><h2 style="color:black;" >MyDiary</h2></a></span>
        </div>
        
        <div class="bo_fx">
            <div id="bo_list_total"><span>Total  {{ total }}건</span> {{ currentPage }} 페이지</div>
            <button @click="$router.push('/jobDiary/create')" class="real-button btn btn-outline-dark btn-lg" >글 작성</button>
            <!-- <li style="float:right; list-style:none;" class='bo_li'><a href="/jobDiary/create" class="btn_b01" >글 작성</a></li>  -->
        </div>

        <table class ='table table-striped'>
            <thead class='diary-head'>
                <tr>
                    <th>번호</th>
                    <th>날짜</th>
                    <th>작성자</th>
                    <th>제목</th>
                    <th>상태</th>
                    <th>조회수</th>
                </tr>
            </thead>

            <tbody>
                <tr class='diary-tbody-web diary-tbody-tr' v-for='(  item,  index ) in diary' :key='item._id'>
                    <td id='diary-tbody-index'>{{ index+1 + (currentPage-1)*10 }}</td>
                    <td id='diary-tbody-title' ><a  href='#' style='color:black; text-decoration:none;' @click='detailView(item._id,item.title)'>{{ item.title }}</a></td>
                    <td id='diary-tbody-author'>{{ userInfo.name }}</td>
                    <td id='diary-tbody-date'>{{ item.date }}</td>
                    <td style='text-align:center right:10'>{{ item.state.state }}</td>
                    <td style='text-align:center right:10'>{{ item.views }}</td>
                </tr>
                
                <tr class='diary-tbody-real diary-tbody-tr' v-for='(  item,  index ) in realDiary' :key='item.index'>
                    <td id='diary-tbody-index'>{{ index+1 + (currentPage-1)*10 }}</td>
                    <td id='diary-tbody-title' ><a  href='#' style='color:black; text-decoration:none;' @click='detailView(item._id,item.title)'>{{ item.title }}</a></td>
                    <td id='diary-tbody-author'>{{ userInfo.name }}</td>
                    <td id='diary-tbody-date'>{{ item.date }}</td>
                    <td style='text-align:center right:10'>{{ item.state.state }}</td>
                    <td style='text-align:center right:10'>{{ item.views }}</td>
                </tr>
            </tbody>
        </table>
         
        <job-page class='diary-page' :page='page' :pageData='pageData'  v-model='pageData' v-on:@change="onClickIndex"  />
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    import JobPage from '~/components/jobDiary/Pagination';
    export default {
        created(){
            let fpage;
            this.$route.query.page ? fpage = this.$route.query.page : fpage = 1;
            axios.defaults.headers.common.Authorization ='Bearer '+ this.token;
            axios.get( process.env.BACKEND_URL +'/jobDiary?page='+fpage).then( 
                res => {
                    this.total = res.data.data[0].recordCount;
                    this.$store.commit('diary/SET_REALDIARY', { realDiary : res.data.data });
                    this.$store.commit('diary/SET_DIARY', { jobDiary : res.data.data });
                    this.$store.commit('diary/SET_PAGE', { page : Math.ceil(res.data.data[0].recordCount/10)});
                    for(var i=0; i<this.$store.getters['diary/page']; i++){
                        if(fpage == i+1 ) {
                            this.pageData.push( {number : i+1 , active: true })
                        } else {
                            this.pageData.push( {number : i+1 , active: false })
                        }
                    }
                }
            ).catch(err => {
                console.log(err);
                new Error('fail');
            })
        }, 
        mounted() {
             this.scroll(this.diaryData);
        },
        components : {
            JobPage
        },
        data() {
            let currentPage;
            this.$route.query.page ? currentPage = this.$route.query.page : currentPage = 1;
            return {
                pageData : [],
                currentPage : currentPage,
                total : null
            }
        },
        methods : {
            onClickIndex(pageNumber) {

                if(pageNumber+1 == this.currentPage) return 
                this.pageData[this.currentPage-1].active =false 
                if(this.$route.query.page !== undefined){
                    this.pageData[this.$route.query.page-1].active =false
                }
                this.currentPage = pageNumber+1;
                axios.defaults.headers.common.Authorization ='Bearer '+ this.token;
                axios.get( process.env.BACKEND_URL +'/jobDiary',{ params: { page: pageNumber+1 }}).then( 
                    res => { 
                        this.$store.commit('diary/SET_DIARY',{ jobDiary : res.data.data });
                        this.$router.push({ path: '/jobDiary?page='+(pageNumber+1) });
                    }
                ).catch(err => {
                    console.log(err);
                    new Error('fail')
                })
            },
            detailView(id,title){
                this.$router.push({ path: '/jobDiary/'+id, params: { _id: id }});
            },
            scroll () {
                window.onscroll = () => {
                    if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                        this.pageData[this.currentPage-1].active = false;
                        this.currentPage = this.currentPage +1;
                        if(this.currentPage > this.page){
                            return this.currentPage = this.page
                        }

                        this.pageData[this.currentPage-1].active = true;
                        axios.defaults.headers.common.Authorization ='Bearer '+ this.token;
                        axios.get( process.env.BACKEND_URL +'/jobDiary',{ params: { page: this.currentPage }}).then( 
                            res => {         
                                this.$store.commit('diary/SET_DIARY',{ jobDiary : res.data.data });
                                this.$store.commit('diary/UPDATE_REALDIARY',{ data : res.data.data });
                            }
                        ).catch(err => {
                            console.log(err);
                            new Error("fail");
                        })
                    }
                };
            }
        },
        computed: {
            ...mapGetters({
                token : 'token',
                realDiary : 'diary/realDiary',
                diary : 'diary/jobDiary',
                page : 'diary/page',
                userInfo : 'userInfo'
            })
        }
        
    }
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';
body {
    background-color: white;
}
.breadcrumb{
    margin-top: 2%;
}
.bo_fx a {
    color: #000 !important;
}
a.btn_b01 {
    display: inline-block;
    padding: 7px;
    border: 1px solid #d9ded9;
    background: #f2f5f9;
    vertical-align: middle;
}
a {
    text-decoration: none !important;
}
#bo_list_total{
    display: inline;
}   
.bo_fx{
    box-sizing: inherit;
}
.real-button{
    margin-bottom: 1%; 
    float: right;
}
.btn {
    width: 20%;
    margin: 1%;
}

@media (min-width: 768px) {
    .diary-tbody-real {
        display:none
    }
}
@media (max-width: 768px) {
    .diary-head {
        display: none;
    }
    .diary-tbody-tr td {
        display: inline;
        font-size: 0.6rem;
        border: 0px;
    }
    #diary-tbody-index{
        display: none;
    }
    .diary-tbody-tr{
        display:block;
    }
    #diary-tbody-title{
        display:block;
        font-size: 0.9rem;
        font-weight: bold;
        width: 300px;
    }
    #diary-tbody-author{
        height:30px;
    }
    .diary-page{
        display: none;
    }
    .diary-tbody-web {
        display:none
    }
    .real-button{
        width: 100%;
        display : block;
    }
}
    
</style>
