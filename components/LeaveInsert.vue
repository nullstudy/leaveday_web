<template>
    <div class='wrap'>
        
        <b-modal id="modal1" 
            hide-footer
            title="LeaveDay 등록"
            ref="myModalRef"
            :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant"
            >
            
            <div class="leave-create mb-1" v-if="!this.isleave"> 
                <label>입사일<datepicker v-model="startDT" class='picker'></datepicker></label>
            </div>

            <div class="leave-end mb-1">
                <label>퇴사일<datepicker v-model="endDT" class='picker'></datepicker></label>
            </div>

            <div class="mb-1" v-if="this.endDT">    
                현재<label>&emsp;{{ dateFormat(new Date) }}</label>&emsp;
                남은 일수<label>&emsp;{{ output }} 일 </label>
            </div>

            <br>

            <div class="leave-foot mb-1" v-if="!this.isleave">
                <b-btn class='leave-btn' size="sm" variant="outline-danger" block @click="leaveDayInsert">입력</b-btn>
                <b-btn class='leave-btn' id='leave-cancel-btn' size="sm" variant="outline-danger" block @click="hideModal">닫기</b-btn>
            </div>
                
        </b-modal>
    </div>
</template>

<script>

import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { setCookie , getUserFromCookie } from '~/util/auth'


export default {     

    props: { 
        userInfo : { 
            type: Object,
            require: true
        }
    },
    data() {
        return {
            createDT : new Date(), 
            startDT : new Date(),
            endDT : new Date(),
            leaveCount : 1,
            headerBgVariant: 'dark',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'dark'
        }
    },
    mounted() {
        this.showModal();
    },
    computed: {
      ...mapGetters({
        isleave : 'isLeave',
        token : 'token'
      }),
      output :  function() {
        return this.leaveCount ? this.leaveCount : 1
      }
    },
    watch : {
        endDT : function() { 
            let startDT = new Date(this.startDT.getFullYear(), this.startDT.getMonth() , this.startDT.getDate());
            let createDT = new Date(this.createDT.getFullYear(), this.createDT.getMonth() , this.createDT.getDate());
            let endDT = new Date(this.endDT.getFullYear(), this.endDT.getMonth() , this.endDT.getDate());
            let diff = Math.abs(endDT.getTime() - createDT.getTime());

            if(endDT < createDT || endDT < startDT) {
                return alert('날짜를 올바르게 입력해 주십시오')
            }

            diff = Math.ceil(diff / (1000 * 3600 * 24));
            this.leaveCount = diff;
        }
    },
    methods : {
        showModal () { 
            this.$refs.myModalRef.show()
        },
        hideModal () {
            this.$refs.myModalRef.hide()
        },
        async leaveDayInsert(req,store) {
            this.$refs.myModalRef.hide();
            let leaveData = {
                _id : this.userInfo._id,
                name : this.userInfo.name,
                email : this.userInfo.email,
                startDT : this.startDT,
                endDT : this.endDT,
                leaveCount : this.leaveCount
            }
            axios.defaults.headers.common.Authorization ='Bearer '+ this.token;
            await axios.put(process.env.BACKEND_URL + '/leaveInsert', leaveData )
            .then(response => {
                setCookie(response.data.data)
            }).catch(err => {
                return console.error(err);
            })
            this.$store.commit('SET_ISLEAVE', { isleave : true });
            return window.location.reload(); //라우터 ( 수정할것.)
        },
        dateFormat(data) {
            let date = new Date(data);
            var month = date.getMonth()+1;
            month = month >= 10 ? month : '0' + month;  // month 두자리로 저장
            var day = date.getDate();
            day = day >= 10 ? day : '0' + day;  //day 두자리로 저장
            var year = date.getFullYear();
	        return  year + '-' + month + '-' + day;
        }
    }
}
</script>

<style scoped>
@import 'vue-material/dist/theme/default.css';
/* @import 'vue-material/dist/vue-material.min.css'; */
.leave-create,{
    margin-top:7px;
}
.leave-end {
    margin-bottom:5px;
}
.leave-create label,.leave-end label {
    width:250px;
}
.vdp-datepicker picker {
    display: inline;
}
.picker{
    float: right;
}
.modal-body{
    height: 500px;
}
.mb-1{
    height: 50px;
}
.modal1{
    width:100%;
    height:100%;
}
div input{
    width: 80%;
}
.leave-info{
    display: inline;
}

.mb-1 input{
    position: relative;
    left: 70px;
    bottom: 26px;
}
.leave-btn{
    display: inline;
    width:49%;
    margin-right:1%;
}
#leave-cancel-btn {
    position: relative;
    bottom: 4px;
}
</style>

