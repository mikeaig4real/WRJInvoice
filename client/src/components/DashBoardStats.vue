<template>
  <div>
    <Overview />
    <Payments />
  </div>
</template>


<style scoped>
h1 {
  font-size: 5rem;
}
</style>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

import Payments from '@/components/Payments.vue'
import Overview from '@/components/Overview.vue'

export default {
  name: 'dashboard-stats',
  data() {
    return {
      
    }
  },
  components: {
    Payments,
    Overview,
  },
  props: {

  },
  watch: {

  },
  computed: {
    ...mapState([
      'invoices',
    ])
  },
  methods: {
    ...mapActions([
      
    ])
  },
  mounted() {
    
  },
  unmounted() {

  }
}
</script>
