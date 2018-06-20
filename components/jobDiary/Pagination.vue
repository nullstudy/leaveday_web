<template>
    <div class="pagination">
        <a href="#">&laquo;</a>
        <div v-for='( item,index ) in page' :key='item.index' >
            <a href="#"  
                v-bind:style="page[index].active ? {
                    'background-color' : 'dodgerblue',
                    'color': 'white'
                } : {} " 
                @click='classActive(index)' 
                >{{ index+1 }}</a>
        </div>
        <a href="#">&raquo;</a> 
    </div>
</template>



<script>
    export default {
        props : [
            'page'
        ],
        data() {
            return {
                currentPage : 0
            }
        },
        methods:{
            classActive(pageNumber){
                this.page[this.currentPage].active = false;
                this.currentPage = pageNumber;
                this.page[pageNumber].active = true;
                this.$emit('@change', pageNumber)
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

