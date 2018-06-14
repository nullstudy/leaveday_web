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
                <b-row class="mb-1" v-if="this.isleave" >    
                    입사 일 : <b-col cols="5">{{ this.startDT }} </b-col>
                </b-row>
                <b-row class="mb-1" v-if="this.isleave">    
                    퇴사 일 : <b-col cols="5">{{ endDT }} </b-col>
                </b-row>
                <b-row class="mb-1" v-if="this.isleave">    
                    남은 일 : <b-col cols="5">{{ leaveCount }} </b-col>
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
    props: { 
        userInfo : { 
            type : Object,
            require : true,
            default : function() {
                return {
                    
                }
            } 
        }
    },
    data() {
        let createDT; let startDT; let endDT; let leaveCount;
        this.userInfo.startDT ? startDT = this.dateFormat(this.userInfo.startDT) : startDT = new Date()
        this.userInfo.endDT ? endDT = this.dateFormat(this.userInfo.endDT) : endDT = new Date()
        this.userInfo.leaveCount ? leaveCount = this.userInfo.leaveCount : leaveCount = null
        return {
            startDT : startDT,
            endDT : endDT,
            leaveCount : leaveCount,
            headerBgVariant: 'dark',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'dark'
        }
    },
    computed: {
      ...mapGetters({
        isleave : 'isLeave'
      })
    },
    methods : {
        hideModal () {
            this.$refs.myModalRef.hide()
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
    height: 50px;
}
</style>
