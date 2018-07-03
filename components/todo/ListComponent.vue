<template>
  <div>
    <ul class="list">
      <li v-for="(item, index) in showData" :key='index'>
        <span class="glyphicon glyphicon-asterisk"></span>
        {{ item.todo }}
        <span class="todoBtn label label-primary"
          v-if="selectedTab === 'todo' && item.status == false" 
          v-on:click="finishBtnClick(item)">
          <button type="button" class="close" aria-label="Close" >
              <span aria-hidden="true">&times;</span>
          </button>
        </span>

        <span class="todoBtn label label-danger"
          v-if="selectedTab === 'finish'&& item.status == true"
          v-on:click="resetBtnClick(item)">
          reset</span>
      </li>
    </ul>
  </div>
</template>
 
<script>
export default {
  props: ['data','i','selectedTab'],
  
  mounted(){
    if(this.selectedTab === 'todo'){
      this.showData = this.data.filter(item => item.status === false)
    }else{
      this.showData = this.data.filter(item => item.status === true )
    }
  },
  watch : {
    selectedTab : function() { 
      if(this.selectedTab === 'todo'){
        this.showData = this.data.filter(item => item.status === false)
      }else{
        this.showData = this.data.filter(item => item.status === true )
      }
    }
  },
  methods: {
    finishBtnClick(item) {
      item.index = this.i
      this.$emit('@finish',item)
    },
    resetBtnClick(item) {
      item.index = this.i
      this.$emit('@reset', item)
    }
  },
  computed : {
    todo : function(index) {
    }
  },
 data(){
   return {
     showData : ''
   }
 }
}
</script>