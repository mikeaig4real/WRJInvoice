<template>
  <div>
    <DashBoardAside />
    <div class="w-5/6 absolute right-0">
      Customers
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 5rem;
}
</style>

<script>
import DashBoardAside from '@/components/DashBoardAside.vue'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'


export default {
  name: 'customers',
  data() {
    return {

    }
  },
  components: {
    DashBoardAside,
  },
  props: {

  },
  watch: {

  },
  computed: {
    ...mapState([

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
  async created() {

  },
  unmounted() {

  }
}
</script>
