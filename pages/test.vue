<template>
     <div class="calendar">
        <div class="calendar-header">
            <label class="fa fa-fw fa-chevron-left" @click="subtractMonth">{{arrow}}</label>
            <h4>{{month + ' - ' + year}}</h4>
            <label class="fa fa-fw fa-chevron-right" @click="addMonth">></label>
        </div>

        <div class="weekdays">
            <li v-for="day in days" :key='day'> {{ day }}</li>
        </div>
        
        <br>

        <div class="dates">        
            <li v-for='item in  rate' >
                <span v-show='false'>{{ item }}</span>
            </li>
            <li v-for="date in daysInMonth"   @click='test(date)'
                 :class="{'current-day': date == initialDate &amp;&amp; month == initialMonth && year == initialYear}">
                {{ date }}
            </li>
        </div>
    </div>

</template>

<script>
import moment from 'moment'
// var moment = require('moment');

export default {
    data(){
        return{
            rate:4,
            arrow: "<",
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
            var t = this;
            t.dateContext = moment(t.dateContext).add(1, 'month');
        },
        subtractMonth: function () {
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
