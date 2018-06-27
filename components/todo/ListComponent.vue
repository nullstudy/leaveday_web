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
      console.log('끝',item._id)
      this.$emit('@finish', item)
    },
    resetBtnClick(item) {
      console.log('레셋',item._id)
      this.$emit('@reset', item)
    }
  },
 data(){
   return {}
 }
}
</script>