<template>
  <ul class="tabs">
    <li v-for="tab in tabs" :key='tab' v-bind:class="{active: tab === selectedTab}"
      v-on:click="onClickTabs(tab,i)">
      <!-- v-bind:class => 선택한 탭에 active class를 지정 -->
      {{tab}} 
    </li>
  </ul>
</template>
 
<script>
export default {
  props: ['tabs', 'selectedTab','i'],  //부모(App.vue)로부터 받아옴 => tabs(todo, finish), selectedTab : 현재 선택한 탭
  methods: {
    onClickTabs(tab,i) {
      
      //$emit => 부모(App.vue)에게 @change 이름으로 이벤트 전달
      //tab(선택한 탭) 인자로 같이 전달
      this.$emit('@change', tab,i);
    }
  }
}
</script>

<style>

ul.tabs {
  display: flex;
}

.tabs li {
  display: inline-block;
  width: 50%;
  padding: 15px;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  background-color: #eee;
  color: #999;
}

.tabs li.active {
  background-color: #045FB4;
  color: #fff;
}

</style>
