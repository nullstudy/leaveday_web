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

  
  
  /* right:5.5%; */
  


}

.tabs li.active {
  background-color: #045FB4;
  color: #fff;
}

</style>
