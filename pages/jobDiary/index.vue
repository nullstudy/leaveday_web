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
                <tr v-for='(index , test ) in 25' :key='test'>
                    <td>{{ index }}</td>
                    <td><a href="/jobdiary" style='color:black; text-decoration: none;'>내 말을 끝까지</a></td>
                    <td>박주혁</td>
                    <td>2018.06.19</td>
                    <td style='text-align:center right:10'>화남</td>
                    <td style='text-align:center right:10'>{{ Math.floor(Math.random() * 5000 )}}</td>
                </tr>
            </tbody>
        </table>
        
        <job-page :page='pageData' v-on:@change="onClickIndex" />
    </div>
</template>

<script>
    import JobPage from '~/components/jobDiary/Pagination';
    export default {
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
                this.currentPage = pageNumber;
            }
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
