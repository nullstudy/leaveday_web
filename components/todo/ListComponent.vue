<template>
  <div>
    <ul class="list">
      <li v-for="(item, index) in data" :key='index'>
        <span class="glyphicon glyphicon-asterisk"></span>
        {{item.todo}}
        <span class="todoBtn label label-primary"
          v-if="selectedTab === 'todo' && item.status == false" 
          v-on:click="finishBtnClick(item,index)">
          <button type="button" class="close" aria-label="Close" >
              <span aria-hidden="true">&times;</span>
          </button>
        </span>

        <span class="todoBtn label label-danger"
          v-if="selectedTab === 'finish'&& item.status == true"
          v-on:click="resetBtnClick(item,index)">
          reset</span>
      </li>
    </ul>
  </div>
</template>
 
<script>
export default {
  props: ['data','i','selectedTab'],
  methods: {
    finishBtnClick(item) {
      this.$emit('@finish', item)
    },
    resetBtnClick(item) {
      this.$emit('@reset', item)
    }
  },
 data(){
   return {}
 }
}
</script>