export default {
    // data: [
    //   {todo: '할 일 0', state: true},
    //   {todo: '할 일 1', state: true},
    //   {todo: '할 일 2', state: false},
    //   {todo: '할 일 3', state: true},
    //   {todo: '할 일 4', state: false}
    // ],
    list(tab) {
      return new Promise(res => {
        
        if(tab === 'todo') res(this.data.filter(item => item.status === true))
        if(tab === 'finish') res(this.data.filter(item => item.status === false))
      })
    }, 
    finish(index,i) {
      this.data.filter(item => item.status === true)[index].status = false
    },
   
    reset(index,i) {
      this.data.filter(item => item.status === false)[index].status = true
    },
   
    remove(todo) {
      this.data = this.data.filter(item => item.todo !== todo)
    }
  }
