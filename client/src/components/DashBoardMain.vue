<template>
  <div class="w-5/6 absolute right-0">
    <DashBoardStats />
  </div>
</template>

<style scoped>
h1 {
  font-size: 5rem;
}
</style>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

import DashBoardStats from '@/components/DashBoardStats.vue'

export default {
  name: 'dashboard-main',
  data() {
    return {

    }
  },
  components: {
    DashBoardStats,
  },
  props: {

  },
  watch: {

  },
  computed: {
    ...mapState([
      'userInfo',
    ])
  },
  methods: {
    ...mapActions([
      
    ])
  },
  async mounted() {
    
    // console.log(this.apiData);
  },
  unmounted() {

  }
}
</script>

