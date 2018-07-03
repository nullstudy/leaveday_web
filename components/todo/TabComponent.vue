<template>
  <ul class="tabs">
    <li v-for="tab in tabs" :key='tab' v-bind:class="{active: tab === selectedTab}"
      v-on:click="onClickTabs(tab,i)">
      {{tab}} 
    </li>
  </ul>
</template>
 
<script>
export default {
  props: ['tabs', 'selectedTab','i'], 
  methods: {
    onClickTabs(tab,i) {
      var data  = {
        tab : tab,
        index : i
      }
      this.$emit('@change', data);
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
