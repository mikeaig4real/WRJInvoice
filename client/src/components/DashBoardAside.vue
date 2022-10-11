<template>
    <div class="w-1/6 h-full shadow-md bg-white fixed" id="sidenavSecExample">
        <div class="pt-4 pb-2 px-6">
            <router-link to="/">
                <div class="flex items-center">
                    <div class="shrink-0">
                        <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="rounded-full w-10"
                            alt="Avatar">
                    </div>
                    <div class="grow ml-3">
                        <p class="text-lg font-semibold text-green-600">{{userInfo?.fullName}}</p>
                    </div>
                </div>
            </router-link>
        </div>
        <ul class="relative px-1">
            <li class="relative">
                <router-link class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-green-600 hover:bg-green-50 transition duration-300 ease-in-out"
                    to="/dashboard" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                    <span>DashBoard</span>
                </router-link>
            </li>
            <li class="relative">
                <router-link class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-green-600 hover:bg-green-50 transition duration-300 ease-in-out"
                    :to="`/create-invoice/null/null/?edit=false`" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                    <span>Create/Edit Invoice</span>
                </router-link>
            </li>
            <li class="relative">
                <router-link class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-green-600 hover:bg-green-50 transition duration-300 ease-in-out"
                    :to="`/create-customer/null/null/?edit=false`" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                    <span>Create/Edit Customer</span>
                </router-link>
            </li>
            <li class="relative">
                <router-link class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-green-600 hover:bg-green-50 transition duration-300 ease-in-out"
                    to="/invoices" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                    <span>Invoices</span>
                </router-link>
            </li>
            <li class="relative">
                <router-link class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-green-600 hover:bg-green-50 transition duration-300 ease-in-out"
                    to="/customers" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                    <span>Customers</span>
                </router-link>
            </li>
        </ul>
        <hr class="my-2">
        <div class="text-center bottom-0 absolute w-full mb-2">
            <hr class="m-0">
            <button class="py-2 text-lg text-gray-700">Logout</button>
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
    name: 'dashboard-aside',
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
            'userInfo'
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
