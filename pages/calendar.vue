<template>
    <div>
        <table id="calendar"  border="3" align="center" width="800" height="500"  >
            <tr>
                <td align ="center"> <label onclick="prevClaendar()"></label> </td>
                <td colspan="5" align ="center" id="calendarYM">yyyy년 m월</td>
                <td align ="center"> <label onclick="nextCalendar()">></label> </td>
            </tr>
        
            <tr>
                <td align="center">일</td>
                <td align="center">월</td>
                <td align="center">화</td>
                <td align="center">수</td>
                <td align="center">목</td>
                <td align="center">금</td>
                <td align="center">토</td>
            </tr>
            <tr>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
            </tr>
        </table>
    </div>
</template>

<script>

</script>


<style>
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue/dist/bootstrap-vue.css';
</style>


