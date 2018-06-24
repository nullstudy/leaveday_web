<template>
    <div class="pagination">
        <a href="#" @click='classActive(0)' >&laquo;</a>
        <div v-for='( item,index ) in pageData' :key='index' >
            <a href="#" 
             v-bind:style="pageData[index].active ? {
                'background-color' : 'dodgerblue',
                'color': 'white'
            } : {} " @click='classActive(index)' 
            >{{ item.number }}</a>
        </div>
        <a href="#" @click='classActive(page-1)' >&raquo;</a> 
    </div>
</template>

<script>

    export default {
        props : [
            'page','pageData'
        ],
        data() {
            console.log('webhook Test!!!')
            return {
                currentPage : 0
            }
        },
        methods:{
            classActive(pageNumber){
                this.pageData[this.currentPage].active = false;
                this.currentPage = pageNumber;
                this.pageData[pageNumber].active = true;
                this.$emit('@change', pageNumber);
            }
        }
    }
</script>



<style>
    .pagination {
        align-items: center; 
        justify-content: center;
    }

    .pagination a {
        color: black;
        float: left;
        padding: 8px 16px;
        text-decoration: none;
        transition: background-color .3s;
    }

    .pagination a:hover:not(.active) {background-color: #ddd;}
</style>

