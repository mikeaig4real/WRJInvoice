<template>
  <div>
    <DashBoardAside />
    <div class="w-5/6 absolute right-0">
      <div class="flex flex-col">
        <div class="container px-5 py-2 mx-auto lg:pt-24 lg:px-32">
          <h1 v-if="isLoading">Loading...</h1>
          <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div v-if="invoices?.length && !isLoading" class="overflow-hidden">
              <h1>Invoices</h1>
              <table class="min-w-full text-center">
                <thead class="border-b bg-green-800">
                  <tr>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                      NO
                    </th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                      Client
                    </th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                      Amount
                    </th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                      Status
                    </th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                      Due Date
                    </th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                      Edit
                    </th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="({dueDate,invoiceId,items,payments,customer:{fullName,createdAt}},index) in invoices"
                    class="bg-white border-b">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{index + 1}}</td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {{fullName}}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {{getTotal(items)}}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {{getStatus(items,payments)}}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {{`In ${Math.floor((new Date(dueDate) - new Date())/(1000 * 60 * 60 * 30))} day(s)`}}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <div class="flex space-x-2 justify-center">
                        <router-link :to="`/create-invoice/${invoiceId}/${index}?edit=true`" data-mdb-ripple="true" data-mdb-ripple-color="light"
                          class="inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">
                          Edit
                        </router-link>
                      </div>
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <div class="flex space-x-2 justify-center">
                        <button @click="deleteOneInvoice(invoiceId)" type="button" data-mdb-ripple="true" data-mdb-ripple-color="light"
                          class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
import DashBoardAside from '@/components/DashBoardAside.vue'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'


export default {
  name: 'invoices',
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
      'invoices',
      'isLoading'
    ])
  },
  methods: {
    ...mapActions([
      'deleteInvoice',
      'getItem',
      'getInvoices',
      'getCustomers',
      'getPayments',
    ]),
    getTotal(items) {
      return items.reduce((acc, { amount }) => {
        acc += amount;
        return acc;
      }, 0);
    },
    getStatus(items, payments) {
      const totalCost = items.reduce((acc, { amount }) => {
        acc += amount;
        return acc;
      }, 0);
      const totalPayments = payments.reduce((acc, { amount }) => {
        acc += amount;
        return acc;
      }, 0);
      return totalPayments === 0 ? 'None' : totalPayments >= totalCost ?  'Full' : 'Partial'
    },
    async deleteOneInvoice(invoicedId) {
      try {
        await this.deleteInvoice({ invoicedId });
      } catch (error) {
        this.$router.push({ name: 'dashboard' });
      }
    },
  },
  async created() {
    try {
      await this.getInvoices({});
    } catch (error) {
      this.$router.push({ name: 'dashboard' });
    }
  },
  unmounted() {

  }
}
</script>
