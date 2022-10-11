<template>
  <div>
    <DashBoardAside />
    <div class="w-5/6 absolute right-0">
      <div class="container w-9/12 px-5 py-2 mx-auto lg:pt-24 lg:px-32">
        <form>
          <div class="form-group mb-6">
            <label for="dueDate" class="form-label inline-block mb-2 text-gray-700">Due Date</label>
            <input v-model="invoice.dueDate" type="date" class="form-control
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
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="Enter email">
          </div>
          <div class="form-group mb-6">
            <label for="exampleInputPassword1" class="form-label inline-block mb-2 text-gray-700">Password</label>
            <input type="password" class="form-control block
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
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword1"
              placeholder="Password">
          </div>
          <div class="form-group form-check mb-6">
            <input type="checkbox"
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              id="exampleCheck1">
            <label class="form-check-label inline-block text-gray-800" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="
            px-6
            py-2.5
            bg-blue-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
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
  name: 'create-invoice',
  data() {
    return {
      invoice: {
        "_id": "6341d658f811d0920ad7995b",
        "userId": "lA1QuMF4EvKXE564ahQ6xFRy",
        "customerId": "OAmdXnpv8rXJGNZTXv85BsR3",
        "invoiceId": "FqIY6tsS8nkSBvqtIvnWnk4H",
        "date": "2022-10-09T00:00:00.000Z",
        "dueDate": "2022-10-16T00:00:00.000Z",
        "updatedAt": "2022-10-08T19:58:16.514Z",
        "createdAt": "2022-10-08T19:58:16.514Z",
        "items": [
          { "name": "food", "price": 200, "qty": 3, "disc": 0, "amount": 600 },
          { "name": "drink", "price": 100, "qty": 3, "disc": 0, "amount": 300 }
        ],
        "tax": 0,
        "total": 900,
        "notes": "Test Note 2",
        "balance": 900,
        "currency": "NGN",
        "paid": 0,
        "customer": {
          "_id": "6341d50ff811d0920ad79959",
          "firstName": "MikeCustomer1",
          "lastName": "RoyCustomer1",
          "email": "michael@4canplay.com",
          "customerId": "OAmdXnpv8rXJGNZTXv85BsR3",
          "userId": "lA1QuMF4EvKXE564ahQ6xFRy",
          "fullName": "MikeCustomer1 RoyCustomer1",
          "address": "10 Adams Street",
          "phone": "08168918162",
          "createdAt": "2022-10-08T19:52:47.798Z",
          "updatedAt": "2022-10-08T19:52:47.798Z"
        },
        "payments": []
      }
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
      'invoices'
    ])
  },
  methods: {
    ...mapActions([

    ])
  },
  mounted() {
    let { params: { invoiceId, index }, query: { edit } } = this.$route;
    if (edit) {
      // console.log(this.invoices[index]);
      this.invoice = this.invoices[index];
      console.log(this.invoice);
    }
  },
  unmounted() {

  }
}
</script>
