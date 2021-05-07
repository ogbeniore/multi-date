<template>
  <div id="app">
    <k-date-multi placeholder="Date of Birth" v-model="dob" />
  </div>
</template>

<script>
import {KDateMulti} from '@/components/DateMulti'

export default {
  name: 'App',
  components: {
    KDateMulti
  },
  data: () => ({
    dob: ''
  }),
  mounted() {
    this.dob = ''
  }
}
</script>
