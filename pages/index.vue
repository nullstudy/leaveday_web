<template>
    <div>
        <calendar/>
    </div>
</template>

<script>
import { setToken } from '~/util/auth'
import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Calendar from '../components/Calendar'

export default {     
    components: {
      Calendar
    }
}
</script>

<style>
   
</style>
