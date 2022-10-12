<template>
  <div>
    <DashBoardAside />
    <div class="w-5/6 absolute right-0">
      <h1 v-if="isLoading">Loading...</h1>
      <div v-if="!isLoading" class="container w-9/12 px-5 py-2 mx-auto lg:pt-24 lg:px-32">
        <div class="flex justify-left">
          <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <h2>Bill To</h2>
            <div v-if="showChangeCustomer" class="flex justify-center">
              <div class="mb-3 xl:w-96">
                <select @change="handleChangeCustomer" v-model="invoices[this.$route.params.index].customer" class="form-select 
                appearance-none
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding bg-no-repeat
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 
                  focus:bg-white 
                  focus:border-blue-600 
                  focus:outline-none" aria-label="Default select example">
                  <option v-for="(customer, index) in customers">{{customer.fullName}}</option>
                </select>
              </div>
            </div>
            <div v-if="!showChangeCustomer">
              <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
                {{invoices[this.$route.params.index].customer.fullName}}</h5>
              <p class="text-gray-700 text-base mb-4">
                {{invoices[this.$route.params.index].customer.address}}
              </p>
              <p class="text-gray-700 text-base mb-4">
                {{invoices[this.$route.params.index].customer.email}}
              </p>
              <p class="text-gray-700 text-base mb-4">
                {{invoices[this.$route.params.index].customer.phone}}
              </p>
              <button @click="changeCustomer" type="button" class=" inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md
                             hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800
                              active:shadow-lg transition duration-150 ease-in-out">Change Customer
              </button>
            </div>
          </div>
        </div>
        <br>
        <form @submit.prevent>
          <table class="w-1/12 text-center">
            <thead class="border-b bg-green-800">
              <tr>
                <th scope="col" class="text-sm font-medium text-white px-3 py-1.5">
                  NO
                </th>
                <th scope="col" class="text-sm font-medium text-white px-3 py-1.5">
                  Name
                </th>
                <th scope="col" class="text-sm font-medium text-white px-3 py-1.5">
                  Price
                </th>
                <th scope="col" class="text-sm font-medium text-white px-3 py-1.5">
                  Quantity
                </th>
                <th scope="col" class="text-sm font-medium text-white px-3 py-1.5">
                  Discount
                </th>
                <th scope="col" class="text-sm font-medium text-white px-3 py-1.5">
                  Amount
                </th>
                <th scope="col" class="text-sm font-medium text-white px-3 py-1.5">
                  Alter
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="({name,price,amount,qty,desc},index) in invoices[this.$route.params.index].items"
                class="bg-white border-b">
                <td class="px-3 py-1.5 whitespace-nowrap text-sm font-medium text-gray-900">{{index + 1}}</td>
                <td class="text-sm text-gray-900 font-light px-3 py-1.5 whitespace-nowrap">
                  <input class="
                      px-3
                      py-1.5
                      bg-green-600
                      text-white
                      font-medium
                      text-xs
                      leading-tight
                      uppercase
                      rounded
                      shadow-md
                      hover:bg-green-700 hover:shadow-lg
                      focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
                      active:bg-green-800 active:shadow-lg
                      transition
                      duration-150
                      ease-in-out" v-model="invoices[this.$route.params.index].items[index].name" type="text"
                    name="itemName" id="itemName">
                </td>
                <td class="text-sm text-gray-900 font-light px-3 py-1.5 whitespace-nowrap">
                  <input @input="updateItems(index)" min="0" @change="updateItems(index)" class="
                      px-3
                      py-1.5
                      bg-green-600
                      text-white
                      font-medium
                      text-xs
                      leading-tight
                      uppercase
                      rounded
                      shadow-md
                      hover:bg-green-700 hover:shadow-lg
                      focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
                      active:bg-green-800 active:shadow-lg
                      transition
                      duration-150
                      ease-in-out" v-model="invoices[this.$route.params.index].items[index].price" type="number"
                    name="itemPrice" id="itemPrice">
                </td>
                <td class="text-sm text-gray-900 font-light px-3 py-1.5 whitespace-nowrap">
                  <input min="0" @input="updateItems(index)" @change="updateItems(index)" class="
                      px-3
                      py-1.5
                      bg-green-600
                      text-white
                      font-medium
                      text-xs
                      leading-tight
                      uppercase
                      rounded
                      shadow-md
                      hover:bg-green-700 hover:shadow-lg
                      focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
                      active:bg-green-800 active:shadow-lg
                      transition
                      duration-150
                      ease-in-out" v-model="invoices[this.$route.params.index].items[index].qty" type="number"
                    name="itemQty" id="itemQty">
                </td>
                <td class="text-sm text-gray-900 font-light px-3 py-1.5 whitespace-nowrap">
                  <input min="0" @input="updateItems(index)" @change="updateItems(index)" class="
                      px-3
                      py-1.5
                      bg-green-600
                      text-white
                      font-medium
                      text-xs
                      leading-tight
                      uppercase
                      rounded
                      shadow-md
                      hover:bg-green-700 hover:shadow-lg
                      focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
                      active:bg-green-800 active:shadow-lg
                      transition
                      duration-150
                      ease-in-out" v-model="invoices[this.$route.params.index].items[index].disc" type="number"
                    name="itemDesc" id="itemDesc">
                </td>
                <td class="text-sm text-gray-900 font-light px-3 py-1.5 whitespace-nowrap">
                  <input min="0" class="
                      px-3
                      py-1.5
                      bg-green-600
                      text-white
                      font-medium
                      text-xs
                      leading-tight
                      uppercase
                      rounded
                      shadow-md
                      hover:bg-green-700 hover:shadow-lg
                      focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
                      active:bg-green-800 active:shadow-lg
                      transition
                      duration-150
                      ease-in-out" v-model="invoices[this.$route.params.index].items[index].amount" type="number"
                    name="itemAmount" id="itemAmount" disabled>
                </td>
                <td class="text-sm text-gray-900 font-light px-3 py-1.5 whitespace-nowrap">
                  <button @click="deleteItem(index)" class="
                                      px-3
                                      py-1.5
                                      bg-green-600
                                      text-white
                                      font-medium
                                      text-xs
                                      leading-tight
                                      uppercase
                                      rounded
                                      shadow-md
                                      hover:bg-green-700 hover:shadow-lg
                                      focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
                                      active:bg-green-800 active:shadow-lg
                                      transition
                                      duration-150
                                      ease-in-out" type="button">Del
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <br>
          <button @click="addItemToItems" type="button" class="
                                px-4
                                py-1.5
                                bg-green-600
                                text-white
                                font-medium
                                text-xs
                                leading-tight
                                uppercase
                                rounded
                                shadow-md
                                hover:bg-green-700 hover:shadow-lg
                                focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
                                active:bg-green-800 active:shadow-lg
                                transition
                                duration-150
                                ease-in-out">Add Item</button>
          <br>
          <br>
          <div class="form-group mb-6">
            <label for="dueDate" class="form-label inline-block mb-2 text-gray-700">Due Date</label>
            <input v-model="invoices[this.$route.params.index].dueDate" type="date" class="form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none" id="dueDate"
              aria-describedby="dueDate" placeholder="Enter DueDate">
          </div>
          <div class="form-group mb-6">
            <label for="total" class="form-label inline-block mb-2 text-gray-700">Total</label>
            <input disabled="true" v-model="invoices[this.$route.params.index].total" type="number" class="form-control block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none" id="total"
              placeholder="Total">
          </div>
          <div class="form-group mb-6">
            <label for="tax" class="form-label inline-block mb-2 text-gray-700">Tax</label>
            <input min="0" @input="updateTotal" @change="updateTotal" v-model="invoices[this.$route.params.index].tax"
              type="number" class="form-control block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none" id="tax"
              placeholder="Tax">
          </div>
          <div class="form-group mb-6">
            <label for="tax" class="form-label inline-block mb-2 text-gray-700">Notes</label>
            <textarea cols="15" rows="5" v-model="invoices[this.$route.params.index].notes" class="form-control block
                                  w-full
                                  px-3
                                  py-1.5
                                  text-base
                                  font-normal
                                  text-gray-700
                                  bg-white bg-clip-padding
                                  border border-solid border-gray-300
                                  rounded
                                  transition
                                  ease-in-out
                                  m-0
                                  focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
              id="notes" placeholder="Notes"></textarea>
          </div>
          <button @click="saveInvoice" type="button" class="
                      px-4
                      py-1.5
                      bg-green-600
                      text-white
                      font-medium
                      text-xs
                      leading-tight
                      uppercase
                      rounded
                      shadow-md
                      hover:bg-green-700 hover:shadow-lg
                      focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
                      active:bg-green-800 active:shadow-lg
                      transition
                      duration-150
                      ease-in-out">Submit</button>
        </form>
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
  name: 'create-invoices',
  data() {
    return {
      invoice: null,
      showChangeCustomer: false,
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
      'invoices',
      'customers',
      'userInfo',
      'isLoading',
    ]),
  },
  methods: {
    ...mapActions([
      'getItem',
      'getInvoices',
      'getCustomers',
      'getPayments',
    ]),
    changeCustomer() {
      this.showChangeCustomer = !this.showChangeCustomer;
    },
    getTotal(items) {
      return items.reduce((acc, { amount }) => {
        acc += amount;
        return acc;
      }, 0);
    },
    handleChangeCustomer(e) {
      let selectedIndex = e.target.options.selectedIndex;
      this.invoices[this.$route.params.index].customer = this.customers[selectedIndex];
      this.showChangeCustomer = !this.showChangeCustomer;
    },
    addItemToItems() {
      this.invoices[this.$route.params.index].items.push({ "name": "", "price": 0, "qty": 0, "disc": 0, "amount": 0 })
    },
    deleteItem(index) {
      this.invoices[this.$route.params.index].items = this.invoices[this.$route.params.index].items.filter((item, i) => i !== index);
      this.invoices[this.$route.params.index].total = this.getTotal(this.invoices[this.$route.params.index].items);
    },
    updateItems(index) {
      let newAmount = Number(this.invoices[this.$route.params.index].items[index].qty) * Number(this.invoices[this.$route.params.index].items[index].price);
      if (Number(this.invoices[this.$route.params.index].items[index].disc) > 0) {
        newAmount -= Number((newAmount * (this.invoices[this.$route.params.index].items[index].disc / 100)).toFixed(2))
      };
      this.invoices[this.$route.params.index].items[index].amount = newAmount;
      this.invoices[this.$route.params.index].total = this.getTotal(this.invoices[this.$route.params.index].items);
    },
    updateTotal() {
      let prevTotal = this.getTotal(this.invoices[this.$route.params.index].items);
      let taxRate = 0;
      if (this.invoices[this.$route.params.index].tax > 0) {
        taxRate = +(Number(this.invoices[this.$route.params.index].tax) / 100).toFixed(2);
      };
      let newTotal = +(prevTotal - (prevTotal * taxRate)).toFixed(2);
      this.invoices[this.$route.params.index].total = newTotal < 0 ? 0 : newTotal;
    },
    saveInvoice() {
      // console.log(this.invoices[this.$route.params.index]);
      // console.log(new Date().toISOString().slice(0, 10))
      // this.invoice = this.invoices[this.$route.params.index];
      console.log(this.invoice);
    }
  },
  beforeMount() {
    this.invoice = this.invoices[this.$route.params.index];
  },
  async created() {
    // console.log('created');
    await this.getInvoices({});
    await this.getCustomers({});
  }
}
</script>
