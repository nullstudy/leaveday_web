<template>
    <div class='wrap-jobdiary'>
        <div class="breadcrumb" style="" ><span class="left">
            <a href="/jobdiary" class='content-title' style="color:black; text-decoration: none;"><h2 style="color:black;" >MyDiary</h2></a></span>
        </div>

        <div class="bo_fx">
            <div id="bo_list_total"><span>Total  {{ total }}건</span> {{ currentPage }} 페이지</div>
            <li style="float:right; list-style:none;" class='bo_li'><a href="/jobDiary/create" class="btn_b01" >글 작성</a></li> 
        </div>

        <table class ='table table-striped'>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>날짜</th>
                    <th>상태</th>
                    <th>조회수</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for='(  item,  index ) in diary' :key='item._id'>
                    <td>{{ index+1 + (currentPage-1)*10 }}</td>
                    <td><a  href='#' style='color:black; text-decoration: none;' @click='detailView(item._id,item.title)'>{{ item.title }}</a></td>
                    <td>{{ userInfo.name }}</td>
                    <td>{{ item.date }}</td>
                    <td style='text-align:center right:10'>{{ item.state.state }}</td>
                    <td style='text-align:center right:10'>{{ item.views }}</td>
                </tr>
            </tbody>
        </table>
        
         
        <job-page :page='page' :pageData='pageData'  v-model='pageData' v-on:@change="onClickIndex" />
        
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    import JobPage from '~/components/jobDiary/Pagination';
    export default {
        created(){
            let fpage;
            this.$route.query.page ? fpage = this.$route.query.page : fpage = 1
            axios.defaults.headers.common.Authorization ='Bearer '+ this.token;
            axios.get( process.env.BACKEND_URL +'/jobDiary?page='+fpage).then( 
                res => {
                    this.total = res.data.data[0].recordCount;
                    this.$store.commit('SET_DIARY', { jobDiary : res.data.data });
                    this.$store.commit('SET_PAGE', { page : Math.ceil(res.data.data[0].recordCount/10)});
                    for(var i=0; i<this.$store.getters.page; i++){
                        if(fpage == i+1 ) {
                            this.pageData.push( {number : i+1 , active: true })
                        } else {
                            this.pageData.push( {number : i+1 , active: false })
                        }
                    }
                }
            ).catch(err => {
                console.log(err)
            })
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
                // if(this.$route.query.page)
                if(this.$route.query.page !== undefined){
                    this.pageData[this.$route.query.page-1].active =false
                }
                this.currentPage = pageNumber+1;
                axios.defaults.headers.common.Authorization ='Bearer '+ this.token;
                axios.get( process.env.BACKEND_URL +'/jobDiary',{ params: { page: pageNumber+1 }}).then( 
                    res => { 
                        this.$store.commit('SET_DIARY',{ jobDiary : res.data.data });
                        this.$router.push({ path: '/jobDiary?page='+(pageNumber+1) });
                    }
                ).catch(err => {
                    console.log(err);
                })
            },
            detailView(id,title){
                this.$router.push({ path: '/jobDiary/'+id, params: { _id: id }});
            }
        },
        computed: {
            ...mapGetters({
                token : 'token',
                diary : 'jobDiary',
                page : 'page',
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
    
    a.btn_b01 {
        display: inline-block;
        padding: 7px;
        border: 1px solid #d9ded9;
        background: #f2f5f9;
        color: #000;
        text-decoration: none;
        vertical-align: middle;
    }
    #bo_list_total{
        display: inline;
    }   
    .bo_fx{
        box-sizing: inherit;
    }
    .bo_li{
        margin-bottom: 1%; 
    }
</style>
