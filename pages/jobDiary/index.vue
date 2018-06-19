<template>
    <div class='wrap-jobdiary'>
        <div class="breadcrumb" style="" ><span class="left">
            <a href="/jobdiary" class='content-title' style="color:black; text-decoration: none;"><h2 style="color:black;" >MyDiary</h2></a></span>
        </div>

        <div class="bo_fx">
            <div id="bo_list_total"><span>Total 198,801건</span>1 페이지</div>
            <li style="float:right; list-style:none;" class='bo_li'><a href="/diaryWrite" class="btn_b01" >글 작성</a></li> 
        </div>

        <table class ='table'>
            <thead>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
                <th>leavePoint</th>
                <th>조회수</th>
            </tr>
            </thead>

            <tbody>
                <tr v-for='(index,test ) in 25'>
                    <td>{{ index }}</td>
                    <td><a href="/jobdiary" style='color:black; text-decoration: none;'>내 말을 끝까지 잘들어봐야 됩니다 정말로</a></td>
                    <td>박주혁</td>
                    <td>2018.06.19</td>
                    <td style='text-align:center right:10'>{{ Math.floor(Math.random() * 5 )}}</td>
                    <td style='text-align:center right:10'>{{ Math.floor(Math.random() * 50000 )}}</td>
                </tr>
            </tbody>
        </table>
        
        <div class="pagination">
            <a href="#">&laquo;</a>
            <div v-for='( test,index ) in pageData' >
                <a href="#"  
                    v-bind:style="pageData[index].active ? {
                        'background-color' : 'dodgerblue',
                        'color': 'white'
                    } : {} " 
                    @click='classActive(index)' 
                 >{{ index+1 }}</a>
            </div>
            <a href="#">&raquo;</a> 
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageData : [ { index : 0, active : true } ,{index : 1 ,active : false} , {index : 2 ,active : false}],
                currentPage : 0,
                isActive : false
            }
        },
        methods:{
            classActive(index){
                this.pageData[this.currentPage].active = false;
                this.currentPage = index;
                this.pageData[index].active = true;
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


    .pagination {
        align-items: center; 
        justify-content: center;
    }
    /* Pagination links */
    .pagination a {
        color: black;
        float: left;
        padding: 8px 16px;
        text-decoration: none;
        transition: background-color .3s;
    }

    /* Style the active/current link */
    /* .pagination a.active {
        background-color: dodgerblue;
        color: white;
    } */

    /* Add a grey background color on mouse-over */
    .pagination a:hover:not(.active) {background-color: #ddd;}
    
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
