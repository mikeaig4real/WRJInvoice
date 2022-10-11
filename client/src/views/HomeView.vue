<template>
  <nav
    class=" relative w-full flex flex-wrap items-center justify-between py-8  bg-gray-100  text-gray-500  hover:text-gray-700  focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
    <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
      <div id="navbarSupportedContent">
        <router-link to="/"
          class="flex items-center text-2xl  text-gray-900  hover:text-gray-900  focus:text-gray-900 mt-2 lg:mt-0 mr-1">
          INVOICIFY
        </router-link>
      </div>
      <div class="flex items-center text-2xl relative">
        <router-link to="/get-started">
          {{displayText}}
        </router-link>
      </div>
    </div>
  </nav>
  <div class="p-12 text-center relative overflow-hidden bg-no-repeat bg-contain h-96">
    <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
      style="background-color: rgba(2, 56, 53, 0.7)">
      <div class="flex justify-center items-center h-full">
        <div class="text-white">
          <h1 class="text-9xl">Manage your INVoiCES</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'home',
  data() {
    return {

    }
  },
  props: {

  },
  watch: {

  },
  computed: {
    ...mapState([
      'displayText'
    ])
  },
  methods: {
    ...mapActions([

    ])
  },
  components: {

  },
  mounted() {

  }
}
</script>
