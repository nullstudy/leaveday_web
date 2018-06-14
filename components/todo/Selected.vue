<template>
    <div>
        <b-form-select v-model="selected" :options="options" class="mb-3" />
        <div>Selected: <strong>{{ selected }}</strong></div>
    </div>
</template>


<script>
export default {
  data () {
    return {
      selected: null,
      options: [
        { value: null, text: '진행 중' },
        { value: 'a', text: '진행 전' },
        { value: 'b', text: '완료' },
        { value: {'C': '3PO'}, text: '실패' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ]
    }
  }
}
</script>