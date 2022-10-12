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
      'getInvoices',
      'getCustomers',
      'getPayments',
    ])
  },
  async mounted() {

  },
  unmounted() {

  },
  async created() {
    try {
      await this.getInvoices({});
      console.log(this.invoices);
    } catch (error) {
      this.$router.push({ name: 'get-started' });
    };
  }
}
</script>
