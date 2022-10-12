<template>
    <section class="overflow-hidden text-gray-700">
        <div class="container px-5 py-2 mx-auto lg:pt-24 lg:px-32">
            <div class="flex flex-wrap -m-1 md:-m-2">
                <div class="flex flex-wrap w-full">
                    <div
                        class="w-1/5 p-1 md:p-2 md:m-2 bg-green-900 bg-clip-padding border border-solid rounded transition ease-in-out">
                        <p class="text-1xl">Payments Received</p>
                        <h1 class="text-5xl">{{getComputedValues(invoices).paymentsReceived}}</h1>
                    </div>
                    <div
                        class="w-1/5 p-1 md:p-2 md:m-2 bg-green-900 bg-clip-padding border border-solid rounded transition ease-in-out">
                        <p class="text-1xl">Pending Amount</p>
                        <h1 class="text-5xl">{{getComputedValues(invoices).pendingAmount}}</h1>
                    </div>
                    <div
                        class="w-1/5 p-1 md:p-2 md:m-2 bg-green-900 bg-clip-padding border border-solid rounded transition ease-in-out">
                        <p class="text-1xl">Total Amount</p>
                        <h1 class="text-5xl">{{getComputedValues(invoices).totalAmount}}</h1>
                    </div>
                    <div
                        class="w-1/5 p-1 md:p-2 md:m-2 bg-green-900 bg-clip-padding border border-solid rounded transition ease-in-out">
                        <p class="text-1xl">Total Invoices</p>
                        <h1 class="text-5xl">{{getComputedValues(invoices).totalInvoices || invoices.length}}</h1>
                    </div>
                    <div
                        class="w-1/5 p-1 md:p-2 md:m-2 bg-green-900 bg-clip-padding border border-solid rounded transition ease-in-out">
                        <p class="text-1xl">Totally Paid Invoices</p>
                        <h1 class="text-5xl">{{getComputedValues(invoices).totallyPaidInvoices}}</h1>
                    </div>
                    <div
                        class="w-1/5 p-1 md:p-2 md:m-2 bg-green-900 bg-clip-padding border border-solid rounded transition ease-in-out">
                        <p class="text-1xl">Partially Paid Invoices</p>
                        <h1 class="text-5xl">{{getComputedValues(invoices).partiallyPaidInvoices}}</h1>
                    </div>
                    <div
                        class="w-1/5 p-1 md:p-2 md:m-2 bg-green-900 bg-clip-padding border border-solid rounded transition ease-in-out">
                        <p class="text-1xl">UnPaid Invoices</p>
                        <h1 class="text-5xl">{{getComputedValues(invoices).unPaidInvoices}}</h1>
                    </div>
                    <div
                        class="w-1/5 p-1 md:p-2 md:m-2 bg-green-900 bg-clip-padding border border-solid rounded transition ease-in-out">
                        <p class="text-1xl">OverDue Invoices</p>
                        <h1 class="text-5xl">{{getComputedValues(invoices).overDueInvoices}}</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
li {
    margin: 2rem 0 2rem 0;
    padding: 0.5rem 0 0.5rem 0;
}
</style>


<script>

import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
    name: 'overview',
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
            'invoices'
        ]),
    },
    methods: {
        ...mapActions([
            'getItem',
            'getInvoices',
            'getCustomers',
            'getPayments',
        ]),
        getComputedValues(invoices) {
            let computedValues = invoices.reduce((tAcc, { payments, items, dueDate }) => {
                const singlePayments = payments.reduce((pAcc, { amount }) => {
                    pAcc += amount;
                    return pAcc;
                }, 0);
                const singleCosts = items.reduce((cAcc, { amount }) => {
                    cAcc += amount;
                    return cAcc;
                }, 0);
                if (singlePayments === 0 && singleCosts > 0) tAcc.unPaidInvoices++;
                if (singlePayments >= singleCosts) tAcc.totallyPaidInvoices++;
                if (singlePayments > 0 && singlePayments < singleCosts) tAcc.partiallyPaidInvoices++;
                if (singlePayments < singleCosts && new Date() > new Date(dueDate)) tAcc.overDue++;
                tAcc.paymentsReceived += singlePayments;
                tAcc.totalCosts += singleCosts;
                return tAcc;
            }, {
                pendingAmount: 0,
                totalInvoices: 0,
                paymentsReceived: 0,
                totalAmount: 0,
                totallyPaidInvoices: 0,
                partiallyPaidInvoices: 0,
                unPaidInvoices: 0,
                overDueInvoices: 0,
                totalCosts: 0,
            });
            computedValues = {
                ...computedValues,
                totalInvoices: invoices.length,
                pendingAmount: computedValues.totalCosts - computedValues.paymentsReceived,
            };
            return computedValues;
        }
    },
    async created() {
        await this.getInvoices({});
    },
    unmounted() {

    }
}
</script>