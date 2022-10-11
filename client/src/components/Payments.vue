<template>
  <div class="flex flex-col">
    <div class="container px-5 py-2 mx-auto lg:pt-24 lg:px-32">
      <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
        <div v-if="payment?.length" class="overflow-hidden">
          <h1>Recent Payments</h1>
          <table class="min-w-full text-center">
            <thead class="border-b bg-green-800">
              <tr>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  NO
                </th>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Paid By
                </th>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Date Paid
                </th>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Amount Paid
                </th>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Payment Method
                </th>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="({paymentType,notes,amount,customer:{fullName,createdAt}},index) in payment"
                class="bg-white border-b">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{index + 1}}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{fullName}}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{new Date(createdAt)}}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{amount}}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{paymentType || 'None Specified'}}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{notes || 'No notes'}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
h1 {
  font-size: 5rem;
}
</style>

<script>

import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'payments',
  data() {
    return {

    }
  },
  components: {

  },
  props: {

  },
  watch: {

  },
  computed: {
    ...mapState([
      'payment'
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
