<template>
     <div class="calendar">
        <div class="calendar-header">
            <label class="fa fa-fw fa-chevron-left" @click="subtractMonth"> <strong><<</strong></label>
            <h4>{{ month + ' - ' + year }}</h4>
            <label class="fa fa-fw fa-chevron-right" @click="addMonth"><strong>>></strong></label>
        </div>

        <div class="weekdays">
            <li v-for="day in days" :key='day'>{{ day }}</li>
        </div>
    
        <div class="dates">        
            <li class='dates-date' v-for='item in  rate'>
                <span class='dates-li' style='color : LightGray'>{{ beforeLastDate - ( rate-item )}}</span>
            </li>
 
            <li class='dates-date' v-for="date in daysInMonth" :key='date'  @click="createDiary(year,month,date)"
                 :class="{'current-day': date == initialDate &amp;&amp; month == initialMonth && year == initialYear}">

                <component  :is="currentView" :item="park" v-if="park.year == year && park.month == month && park.day == date && park.full" > </component>

                <span @click='diaryActive(year,month,date)'> {{ showDiary(year,month,date) }}</span>

                <span class='dates-li'>{{ date }}</span>
            </li>

            <li class='dates-date' v-for='item in  6-lastDate' style='color : LightGray'>
                <span class='dates-li'>{{ item }}</span>
            </li>
        </div>
        
        <component  :is="currentDiary" :diaryInfo='diaryData'> </component>
        
    </div>

</template>

<script>
import moment from 'moment'
import { mapGetters, mapMutations, mapActions } from 'vuex';
import MenuBar from '@/components/jobDiary/MenuBar';
import MainDiary from '@/components/jobDiary/MainDiary'
import axios from 'axios';
export default {
    created(){
        let today = new Date();
        let findData = { 
            startDT : new Date(today.getFullYear(),today.getMonth(),-this.rate+1),
            endDT : new Date(today.getFullYear(),today.getMonth()+1,6-this.lastDate+1) 
        }
        this.setHeader(this.token)
        this.$store.dispatch('diary/getMaindiary',findData)
    },
    components : {
        'menu-bar' : MenuBar,
        'main-diary' : MainDiary
    },
    data(){
        let dayCheck = new Array(0,1,2,3,4,5,6);
        let today = new Date()        
        let currentMonth = new Date(today.getFullYear(),today.getMonth(),1).getDay(); // 현재달 1일 요일 
        let todayLabel = dayCheck[currentMonth];
        let lastDate = new Date(today.getFullYear(),today.getMonth()+1,0).getDay(); //이번달 마지막날
        let beforeLastDate = new Date(today.getFullYear(),today.getMonth(),0).getDate(); // 저번달 마지막날
        return{
            park:{
                year: null,
                month: null,
                day: null,
                full: null
            },
            diaryData:null,
            currentView: null, 
            currentDiary: null,
            beforeLastDate : beforeLastDate, //저번달 마지막 날짜 
            rate: todayLabel,
            lastDate : lastDate, // 현재 마지막 날짜
            currentMonth : moment().month(), //현재달 
            today: moment(new Date),
            dateContext: moment(new Date),
            days: ['일', '월', '화', '수', '목', '금', '토'],
        }
    },
    computed: {
        ...mapGetters({
            token : 'token',
            mainDiary : 'diary/mainDiary',
            userInfo : 'userInfo'
        }),
        year: function () {
            var t = this;
            return t.dateContext.format('Y');
        },
        month: function () {
            var t = this;
            return t.dateContext.format('MMMM');
        },
        //Previous Code Above
        daysInMonth: function () {
            var t = this;
            return t.dateContext.daysInMonth();
        },
        currentDate: function () {
            var t = this;
            return t.dateContext.get('date');
        },
        firstDayOfMonth: function () {
            var t = this;
            var firstDay = moment(t.dateContext).subtract((t.currentDate - 1), 'days');
            return firstDay.weekday();
        },
        //Previous Code Above
        initialDate: function () {
            var t = this;
            return t.today.get('date');
        },
        initialMonth: function () {
            var t = this;
            return t.today.format('MMMM');
        },
        initialYear: function () {
            var t = this;
            return t.today.format('Y');
        }
    },
    methods: {
        ...mapActions({
            setHeader: 'setHeaderAuth'
        }),
        createDiary(y,m,d){
            let today = new Date();
            this.park.year = y
            this.park.month = m;
            this.park.day = d;
            let cdata = this.dateFormat(y,m,d);
            let tdata = this.dateFormat()
            if(cdata == tdata) { 
                this.park.full = true;
            } else {
                this.park.full = false;
            }
            this.currentView = "menu-bar" 
        },
        showDiary(y,m,d){
            let fullDate = this.dateFormat(y,m,d)
            for(var item in this.mainDiary){
                if(fullDate == this.mainDiary[item].date){
                    return this.mainDiary[item].title;
                }
            }
        },
        diaryActive(y,m,d){
            let fullDate = this.dateFormat(y,m,d);
            this.diaryData = this.mainDiary.filter(item => item.date == fullDate )
            this.currentDiary = "main-diary" 
        },
        addMonth: function () {
            this.common(1);
            var t = this;
            t.dateContext = moment(t.dateContext).add(1, 'month');
        },
        subtractMonth: function () {
            this.common(-1);
            var t = this;
            t.dateContext = moment(t.dateContext).subtract(1, 'month');
        },
        common(data){
            var dayCheck = new Array(0,1,2,3,4,5,6);
            var today = new Date();
            this.currentMonth = this.currentMonth + data;
            var currentMonth = new Date(today.getFullYear(),this.currentMonth,1).getDay();
            this.rate = dayCheck[currentMonth];
            this.lastDate = new Date(today.getFullYear(),this.currentMonth+1,0).getDay() // 이번달 마지막날 
            this.beforeLastDate = new Date(today.getFullYear(),this.currentMonth,0).getDate(); // 저번달 마지막날
        },
        dateFormat(y,m,d){
            let date 
            y ?  date = new Date (y+m+d) :  date = new Date()
            var month = date.getMonth()+1;
            month = month >= 10 ? month : '0' + month;  // month 두자리로 저장
            var day = date.getDate();
            day = day >= 10 ? day : '0' + day;  //day 두자리로 저장
            var year = date.getFullYear();
            return year + '-' + month + '-' + day;
        }
    }
}    
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';

.calendar-header{
    margin: 20px;
}

.calendar li {
    list-style-type: none;
    display: inline-block;
}

h4 {
    display: inline;    
}

.calendar-header{
    text-align: center;
}

.weekdays {
    display:table; 
    width:100%; 
    border-collapse:collapse;
}

.weekdays li {
    display:table-cell;
    box-sizing:border-box;
    width: 13.6%;
    background-color: white;
    text-align: center;
    font-weight: bold;
    border: 1px solid #e0e0e0;;
}

.dates {
    width:100%; 
    background-color: write;
}

.dates li {
    width: 14.28%;
    height: 100px;
    text-align: right;
    font-size:15px;
    font-weight: bold;
    color:black;
    border: 1px solid #e0e0e0;;
    border-right:0px 
}
.dates-date:nth-child(7n) {
    border-right:1px solid #e0e0e0;;
    color : rebeccapurple;
}
.dates-date:nth-child(7n+1) {
    color : red;
}


.dates-li{
    margin-right: 3%;
}
/* Highlight the "current" day */

</style>
