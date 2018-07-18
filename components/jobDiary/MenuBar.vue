<template>
    <b-dropdown-item href="#" class='menu-list' style='text-decoration: none;' @click="createDiary(item)">글쓰기</b-dropdown-item>

</template>

<script>
    export default {
        props:['item'],
        date(){
            return {
                
            }
        },
        methods: {
            createDiary(data){
                this.$router.push('/jobDiary/create')
            }
        }
    }
</script>

<style scoped>
.menu-list{
    display: inline;
    position: relative;
    box-sizing:border-box;
    top:40px;
    
}
.md-theme-default a:not(.md-button) {
    font-weight: bold;
    color:red;
    right:6%;
}
</style>
