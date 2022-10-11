<template>
  <div>
    <DashBoardAside />
    <div class="w-5/6 absolute right-0">
      Create Customer
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
  name: 'create-customer',
  data() {
    return {

    }
  },
  components: {
    DashBoardAside
  },
  props: {

  },
  watch: {

  },
  computed: {
    ...mapState([
      'apiData'
    ])
  },
  methods: {
    ...mapActions([
      'setItem',
    ])
  },
  mounted() {
    this.apiData && this.setItem({ item: this.apiData.token, itemName: 'token' });
  },
  unmounted() {

  }
}
</script>
