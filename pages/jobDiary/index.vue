<template>
    <div class='wrap-jobdiary'>
        <div class="breadcrumb" style="" ><span class="left">
            <a href="/jobdiary" class='content-title' style="color:black; text-decoration: none;"><h2 style="color:black;" >MyDiary</h2></a></span>
        </div>

        <div class="bo_fx">
            <div id="bo_list_total"><span>Total 198,801건</span>1 페이지</div>
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
                    <td>{{ index+1 +(currentPage)*10 }}</td>
                    <td><a  href='#' style='color:black; text-decoration: none;' @click='detailView(item._id,item.title)'>{{ item.title }}</a></td>
                    <td>{{ userInfo.name }}</td>
                    <td>{{ item.date }}</td>
                    <td style='text-align:center right:10'>{{ item.state}}</td>
                    <td style='text-align:center right:10'>{{ item.views }}</td>
                </tr>
            </tbody>
        </table>
        
        <job-page :page='pageData' v-on:@change="onClickIndex" />
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    import JobPage from '~/components/jobDiary/Pagination';
    export default {
        created(){
            // let token  = req.app.store.getters.token;
            axios.defaults.headers.common.Authorization ='Bearer '+ this.token
            axios.get( process.env.BACKEND_URL +'/jobDiary?'+this.currentPage+1).then( 
                res => {
                    this.$store.commit('SET_DIARY',{ jobDiary : res.data.data })
                }
            ).catch(err => {
                console.log(err)
            })
        }, 
        components : {
            JobPage
        },
        data() {
            return {
                pageData : [ { number : 0, active : true } ,{ number : 1 ,active : false} , { number : 2 ,active : false}],
                currentPage : 0
            }
        },
        methods : {
            onClickIndex(pageNumber) {
                this.currentPage = pageNumber+1;
                axios.defaults.headers.common.Authorization ='Bearer '+ this.token
                    axios.get( process.env.BACKEND_URL +'/jobDiary',{ params: { page: this.currentPage }}).then( 
                        res => { 
                            this.$store.commit('SET_DIARY',{ jobDiary : res.data.data }) 
                            this.$router.push({ path: '/jobDiary?page='+this.currentPage });
                        }
                    ).catch(err => {
                        console.log(err)
                    })
            },
            detailView(id,title){
                // this.$router.push({ path: '/jobDiary', query: { data : item }});
                this.$router.push({ path: '/jobDiary/'+id, params: { _id: id }});
            }
        },
        computed: {
            ...mapGetters({
                token : 'token',
                diary : 'jobDiary',
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
