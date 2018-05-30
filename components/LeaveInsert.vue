<template>
    <div class='wrap'>
        <b-modal id="modal1" 
            hide-footer
            title="LeaveDay 등록"
            ref="myModalRef"
            :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant">
            <b-container fluid>
                <b-row class="mb-1" v-if="!this.isleave">    
                    입사일<b-col cols="5"><datepicker   v-model="startDT" class='picker'></datepicker></b-col>
                    퇴사일<b-col cols="4"><datepicker   v-model="endDT" class='picker'></datepicker></b-col>
                </b-row>
                <b-row class="mb-1" v-if="this.endDT">    
                    현재 <b-col cols="5"><p> {{ dateFormat(new Date) }} </p></b-col>
                    남은 일수 <b-col cols="4"><p> {{ output }} 일</p></b-col>
                </b-row>






                <!-- <b-row class="mb-1" v-if="this.isleave" >    
                    입사 일 : <b-col cols="5">{{ this.startDT }} </b-col>
                </b-row>
                <b-row class="mb-1" v-if="this.isleave" >    
                    시작 일 : <b-col cols="5">{{ createDT }} </b-col>
                </b-row>
                <b-row class="mb-1" v-if="this.isleave">    
                    퇴사 일 : <b-col cols="5">{{ endDT }} </b-col>
                </b-row>
                <b-row class="mb-1" v-if="this.isleave">    
                    남은 일 : <b-col cols="5">{{ leaveCount }} </b-col>
                </b-row> -->
                <b-row class="mb-1" v-if="!this.isleave">
                    <b-col><b-btn size="sm" variant="outline-danger" block @click="leaveDayInsert">입력</b-btn></b-col>
                    <b-col><b-btn size="sm" variant="outline-danger" block @click="hideModal">닫기</b-btn></b-col>
                </b-row>
                <!-- <b-row class="mb-1" v-if="this.isleave">
                    <b-col><b-btn variant="outline-danger" block @click="hideModal">닫기</b-btn></b-col>
                </b-row> -->
            </b-container>
        </b-modal>
    </div>
</template>

<script>

import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { setCookie , getUserFromCookie } from '~/util/auth'


export default {     
    props: ['userInfo'],
    data() {
        let createDT; let startDT; let endDT; let leaveCount;
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
            this.leaveCount = diff+1;
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

<style>
.mb-1{
    /* border: 1px solid black; */
    height: 50px;
}
</style>
