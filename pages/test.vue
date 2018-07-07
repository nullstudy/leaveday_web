<template>
     <div class="calendar">
        <div class="calendar-header">
            <label class="fa fa-fw fa-chevron-left" @click="subtractMonth">{{arrow}}</label>
            <h4>{{ month + ' - ' + year }}</h4>
            <label class="fa fa-fw fa-chevron-right" @click="addMonth">></label>
        </div>

        <div class="weekdays">
            <li v-for="day in days" :key='day'> {{ day }}</li>
        </div>
        
        <br>

        <div class="dates">        
            
            <li v-for='item in  rate'>
                <span style='color : LightGray' >{{ beforeLastDate - ( rate-item )}}</span>
            </li>

            <li v-for="date in daysInMonth" :key='date'  @click='test(date)'
                 :class="{'current-day': date == initialDate &amp;&amp; month == initialMonth && year == initialYear}">
                {{ date }} 
            </li>

            <li v-for='item in  6-lastDate' style='color : LightGray'>
                <span>{{ item }}</span>
            </li>
        </div>
    </div>

</template>

<script>
import moment from 'moment'
// var moment = require('moment');

export default {
    data(){
        var dayCheck = new Array(0,1,2,3,4,5,6);
        var today = new Date()
        // 현재달 1일 요일 
        var currentMonth = new Date(today.getFullYear(),today.getMonth(),1).getDay();
        var todayLabel = dayCheck[currentMonth];
        var lastDate = new Date(today.getFullYear(),today.getMonth()+1,0).getDay(); //이번달 마지막날
        var beforeLastDate = new Date(today.getFullYear(),today.getMonth(),0).getDate(); // 저번달 마지막날
        
        return{
            beforeLastDate : beforeLastDate,
            rate: todayLabel,
            lastDate : lastDate,
            arrow: "<",
            currentMonth : moment().month(),
            today: moment(new Date),
            dateContext: moment(new Date),
            days: ['일', '월', '화', '수', '목', '금', '토'],
        }
    },
    computed: {
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
        test(date){
            alert(date)
        },
        addMonth: function () {
            
            var dayCheck = new Array(0,1,2,3,4,5,6);
            var today = new Date()

            this.currentMonth = this.currentMonth+1;
            var currentMonth = new Date(today.getFullYear(),this.currentMonth,1).getDay();
            this.rate = dayCheck[currentMonth];
            this.lastDate = new Date(today.getFullYear(),this.currentMonth+1,0).getDay() // 이번달 마지막날 
            this.beforeLastDate = new Date(today.getFullYear(),this.currentMonth,0).getDate(); // 저번달 마지막날
            

            var t = this;
            t.dateContext = moment(t.dateContext).add(1, 'month');
        },
        subtractMonth: function () {
            var dayCheck = new Array(0,1,2,3,4,5,6);
            var today = new Date()
            this.currentMonth = this.currentMonth-1;
            var currentMonth = new Date(today.getFullYear(),this.currentMonth,1).getDay();
            this.rate = dayCheck[currentMonth];

            this.lastDate = new Date(today.getFullYear(),this.currentMonth+1,0).getDay() // 이번달 마지막날 
            this.beforeLastDate = new Date(today.getFullYear(),this.currentMonth,0).getDate(); // 저번달 마지막날
            var t = this;
            t.dateContext = moment(t.dateContext).subtract(1, 'month');
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
    margin: 0;
    padding: 10px 0;
    background-color:#ddd;
}

.weekdays li {
    width: 13.6%;
    color: #666;
    text-align: center;
}


.dates {
    padding: 10px 0;
    background-color: write;
    margin: 0;
}

.dates li {
    width: 13.6%;
    height: 50px;
    text-align: center;
    margin-bottom: 5px;
    font-size:12px;
    color:black;
}

/* Highlight the "current" day */

</style>
