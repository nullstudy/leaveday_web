<template>
    <div class='test'>
        <div>
            <div class='title'> <h3>진행중인 todoList</h3>  </div>
            <div>
                <b-form-select v-model="selected" :options="options" class="mb-3" />
                <div>Selected: <strong>{{ selected }}</strong></div>
            </div>
        </div>
        
        <div class='pro'>
            <div class='todo'>
                영단어 외우기 (25%)
            </div>
            <b-progress :value="25" variant="success" :striped="striped" class="mb-2"></b-progress>
            <div class='todo'>
                다이어트 (65%)
            </div>
            <b-progress :value="65" variant="success" :striped="striped" class="mb-2"></b-progress>
            <div class='todo'>
                자바공부 (90%)
            </div>
            <b-progress :value="65" variant="success" :striped="striped" class="mb-2"></b-progress>
            <div class='todo'>
                결혼준비 (2%)
            </div>
            <b-progress :value="65" variant="success" :striped="striped" class="mb-2"></b-progress>
        </div>
        <b-btn class='write'>
            글쓰기
        </b-btn>
    </div>
</template>

<script>

import axios from 'axios';

export default {     
 data () {
    return {
      selected: null,
      options: [
        { value: null, text: '진행중인 todo' },
        { value: 'b', text: '완료된 todo' },
        { value: 'd', text: '보류 todo'}
      ]
    }
  }
}


</script>

<style>
  body {
      /* text-decoration: none;
      -moz-text-decoration-line: none; */
      position: relative;
      top: 53px;
  }
  .test {
      border : 1px solid black;
      margin : 0 auto; 
      padding : 10px;
      height: 600px;
      width : 800px ;
  }
  .pro {      
      float: left;
      /* width: 700px; */
  }
  .title{
      margin : 0 auto;
  }
  .todo {
      float: left;
      display: inline;
      width:150px;
      padding-right : 15px;
  }
  .mb-2{
      width: 300px;
      top: 3px;
  }
  .write{
      display: inline;
      position: absolute;
      top : 600px;
      left : 850px;
  }
</style>
