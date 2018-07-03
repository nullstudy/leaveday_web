<template>
  <div>
    <ul class="list">
      <li v-for="(item, index) in showData" :key='index'>
        <span class="glyphicon glyphicon-asterisk"></span>
        {{ item.todo }}
        <span class="todoBtn label label-primary"
          v-if="selectedTab === 'todo' && item.status == false" 
          v-on:click="finishBtnClick(item,index)">
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
import { mapGetters, mapMutations, mapActions ,mapState } from 'vuex'
export default {
  props: ['data','showIndex','selectedTab','test'],
  mounted(){
    this.todoFilter();
  },
  watch : {
    selectedTab : function() {
      this.todoFilter();
    },
    data: {
      handler: function () {
        this.todoFilter();
      },
      deep: true
    }
    
  },
  methods: {
    finishBtnClick(item,index) {
      item.index = this.showIndex;
      this.$emit('@finish',item);
    },
    resetBtnClick(item) {
      item.index = this.showIndex;
      this.$emit('@reset', item);
    },
    todoFilter(){
      if(this.selectedTab === 'todo'){
          this.showData = this.data.filter(item => item.status === false)
      }else{
        this.showData = this.data.filter(item => item.status === true )
      }
    }
  },
  data(){
    return {
      showData : {...this.data }
    }
 }
}
</script>