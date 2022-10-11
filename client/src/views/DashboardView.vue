<template>
  <div>
    <DashBoardAside />
    <DashBoardMain />
  </div>
</template>

<style scoped>
li {
  margin: 2rem 0 2rem 0;
  padding: 0.5rem 0 0.5rem 0;
}
</style>


<script>

import DashBoardMain from '@/components/DashBoardMain.vue'
import DashBoardAside from '@/components/DashBoardAside.vue'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  data() {
    return {

    }
  },
  components: {
    DashBoardMain,
    DashBoardAside,
  },
  props: {

  },
  watch: {

  },
  computed: {
    ...mapState([
      'userInfo',
      'invoices',
    ])
  },
  methods: {
    ...mapActions([
      'getItem',
      'makeApiCall',
      'computeOverview'
    ])
  },
  async mounted() {
    try {
      if (!this.userInfo) await this.getItem({ itemName: 'userInfo' });
      await this.makeApiCall({
        urlSuffix: '/invoice',
        method: 'get',
        options: {
          "Authorization": `Bearer ${this.userInfo.token || JSON.parse(localStorage.getItem('userInfo')).token}`
        },
        setAs: 'invoices',
        toLocal: false,
      });
      await this.makeApiCall({
        urlSuffix: '/payment',
        method: 'get',
        options: {
          "Authorization": `Bearer ${this.userInfo.token || JSON.parse(localStorage.getItem('userInfo')).token}`
        },
        setAs: 'payment',
        toLocal: false,
      });
    } catch (error) {
      this.$router.push({ name: 'get-started' });
    };
  },
  unmounted() {
    
  }
}
</script>
