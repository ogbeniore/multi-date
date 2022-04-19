<template>
  <div id="app">
    <k-date-multi placeholder="Date of Birth" v-model="dob" data-neuro-attribute="date_of_birth" />
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
