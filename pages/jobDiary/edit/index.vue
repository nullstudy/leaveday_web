<template>
    <form v-on:submit.prevent="diaryCreate" method="POST" class='wrap-form' role="form" enctype="multipart/form-data" >
        <div class="breadcrumb" style="" ><span class="left">
            <a href="/jobdiary" class='content-title' style="color:black; text-decoration: none;"><h2 style="color:black;" >Job Diary 수정</h2></a></span>
        </div>

        <hr>

        <div class='class-div'>  
            <h5>상태</h5> 

            <b-form-group> 
                <b-form-radio-group id="radios1" v-model="formData.state" :options="radioOptions" name="radioOpenions" required>   
                </b-form-radio-group>               
            </b-form-group> 
        </div>

        <hr>

        <div class='class-div'>
            <h5>제목</h5>
            <b-form-input id="classTitle" v-model="formData.title" required></b-form-input>
        </div>

        <hr>

        <div class='class-div'>
            <h5 class='classDay'>내용</h5>
            <b-form-textarea id="textarea1"
                            v-model="formData.content"
                            placeholder="Enter something"
                            :rows="5"
                            :max-rows="6"
                            required>
            </b-form-textarea>
        </div>

        <hr>
        
        <div>
            <h5 class='classCount'>LeaveCount</h5>
            <b-form-select id='classCount' v-model="formData.leaveCount"  name='count' :options="options" type="number" required>
            </b-form-select>
        </div>

        <hr>
        <div class='submit-btn'>
            <button type="submit" class="btn btn-outline-dark btn-lg" >확인</button>
            <button type="button" class="btn btn-outline-dark btn-lg"  @click="$router.go(-1)">취소</button>
        </div>
        
</form>
</template>

<script>
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';


export default {
    data() {
        let title = this.$store.getters['diary/diaryDetail'].title
        let content = this.$store.getters['diary/diaryDetail'].content
        let state = this.$store.getters['diary/diaryDetail'].state.number
        let leaveCount = this.$store.getters['diary/diaryDetail'].leaveCount
        let _id = this.$store.getters['diary/diaryDetail']._id;
        return {
            options: [
                { value: null, text: '선택해주십시오' },
                0,1,2,3,4,5,6,7,8,9,10
            ],
            radioOptions: [
                { text: '행복', value: 1 },
                { text: '평온', value: 2 },
                { text: '별로', value: 3 },
                { text: '화남', value: 4 },
                { text: '빡침', value: 5 }
            ],
            formData : {
                title : title,
                content : content,
                state : state,
                leaveCount : leaveCount
            },
            id : _id
        }
    },
    methods: {
        diaryCreate() {
            let diaryData = {
                title : String(this.formData.title),
                content : String(this.formData.content),
                state : Number(this.formData.state),
                leaveCount : Number(this.formData.leaveCount)
            }

            axios.put( process.env.BACKEND_URL + '/jobDiary/edit/'+this.id, diaryData )
            .then( (res) => {
                this.$router.push('/jobDiary/'+this.id);
            }).catch(error => {
                new Error('fail')
                console.log('error',error);
            });
        }
    },
    computed: {
      ...mapGetters({
        token : 'token',
      })
    }
}
</script>
    
<style>
@import 'bootstrap/dist/css/bootstrap.css';
.wrap-form{
    position: relative;   
}
.breadcrumb{
    margin-top: 2%;
}
.submit-btn{
    position: relative;
}
.btn {
    width: 48%;
    margin:1%;
    float: center;
}
hr {
    margin-top : 2%;
    margin-bottom : 2%
}
</style>

