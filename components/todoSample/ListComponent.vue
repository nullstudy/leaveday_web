<template>
  <div>
    <ul class="list">
      <li v-for="(item, index) in data">
        <span class="glyphicon glyphicon-asterisk"></span>
        {{item.todo}}
        <span class="todoBtn label label-primary"
          v-if="selectedTab === 'todo'"
          v-on:click="finishBtnClick(index)">
          <!-- <button type="button" class="close" aria-label="Close"> -->
            <button type="checkbox" style="vertical-align: middle;" aria-label="Order" >
            
              <span aria-hidden="true">&times;</span>
          </button>
          <!-- <span class="glyphicon glyphicon-ok"></span> -->
        </span>
        <span class="todoBtn label label-danger"
          v-if="selectedTab === 'finish'"
          v-on:click="resetBtnClick(index)">reset</span>
      </li>
    </ul>
  </div>
</template>
 
<script>
export default {
  props: ['data', 'selectedTab'],
  methods: {
    finishBtnClick(item) {
      this.$emit('@finish', item)
    },
    resetBtnClick(item) {
      this.$emit('@reset', item)
    }
  }
}
</script>