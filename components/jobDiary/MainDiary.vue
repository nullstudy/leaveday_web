<template>
    <div class="single-post-page">
        <section class="post">
            <h2 class="post-title">{{ diaryInfo.title }}</h2>
            <div class="post-details">
                <div class="post-detail">Last updated on {{ diaryInfo.date }}</div>
                <div class="post-detail">Written by {{ this.$store.getters.userInfo.name }}</div>
            </div>
            <p class="post-content">{{ diaryInfo.content }}</p>
            <a href="/jobDiary/edit">수정</a>
        </section>
        
    </div>



    <!-- <div id="demo">
        {{ diaryInfo }}
    </div> -->
</template>

<script>
export default {
    props: ['diaryInfo'],
    date(){
        
      return {
        //   author :  
      }  
    }
}
      

   
    
</script>

<style>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>

