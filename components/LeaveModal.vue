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
                    입사일<b-col cols="5"><datepicker  v-model="startDT" class='picker'></datepicker></b-col>
                    퇴사일<b-col cols="4"><datepicker  v-model="endDT" class='picker'></datepicker></b-col>
                </b-row>
                <b-row class="mb-1" v-if="this.isleave" >    
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
                </b-row>
                <b-row class="mb-1" v-if="!this.isleave">
                    <b-col><b-btn size="sm" variant="outline-danger" block @click="leaveDayInsert">입력</b-btn></b-col>
                    <b-col><b-btn size="sm" variant="outline-danger" block @click="hideModal">닫기</b-btn></b-col>
                </b-row>
                <b-row class="mb-1" v-if="this.isleave">
                    <b-col><b-btn variant="outline-danger" block @click="hideModal">닫기</b-btn></b-col>
                </b-row>
            </b-container>
        </b-modal>
    </div>
</template>

<script>

import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { setCookie } from '~/util/auth'

export default {     
    props: ['userInfo'],
    data() {
        let createDT; let startDT; let endDT; let leaveCount;
        this.userInfo.createDT ? createDT = this.dateFormat(this.userInfo.createDT) : createDT = new Date()
        this.userInfo.startDT ? startDT = this.dateFormat(this.userInfo.startDT) : startDT = new Date()
        this.userInfo.endDT ? endDT = this.dateFormat(this.userInfo.endDT) : endDT = new Date()
        this.userInfo.leaveCount ? leaveCount = this.userInfo.leaveCount : leaveCount = null
        return {
            createDT : createDT, 
            startDT : startDT,
            endDT : endDT,
            leaveCount : leaveCount,
            headerBgVariant: 'dark',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'dark'
        }
    },
    mounted() {
    },
    computed: {
      ...mapGetters({
        isleave : 'isLeave',
        token : 'token'
      })
    },
    methods : {
        hideModal () {
            this.$refs.myModalRef.hide()
        },
        async leaveDayInsert() {
            this.$refs.myModalRef.hide();
            let date1 = new Date(this.createDT.getFullYear(), this.createDT.getMonth() + 1, this.createDT.getDate());
            let date2 = new Date(this.endDT.getFullYear(), this.endDT.getMonth() + 1, this.endDT.getDate());
            let diff = Math.abs(date2.getTime() - date1.getTime());
            diff = Math.ceil(diff / (1000 * 3600 * 24));
            
            let leaveData = {
                _id : this.userInfo._id,
                name : this.userInfo.name,
                email : this.userInfo.email,
                startDT : this.startDT,
                endDT : this.endDT,
                leaveCount : diff
            }
            axios.defaults.headers.common.Authorization ='Bearer '+ this.token;
            await axios.put(process.env.BACKEND_URL + '/leaveInsert', leaveData )
            .then(response => {
                setCookie(response.data.data)
            }).catch(err => {
                return console.error(err);
            })
            this.$store.commit('SET_ISLEAVE', { isleave : true })
            return window.location.reload(); //라우터
            
        },
        dateFormat(data) {
            let date = new Date(data);
            var month = date.getMonth()+1;
            var day = date.getDate();
            var year = date.getFullYear();
            return year+'년 '+month+'월 '+day+'일'       
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
