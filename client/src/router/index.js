import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GetStartedView from '../views/GetStartedView.vue'
import DashboardView from '../views/DashboardView.vue'
import CreateCustomer from '@/components/CreateCustomer'
import Customers from '@/components/Customers'
import CreateInvoice from '@/components/CreateInvoice'
import Invoices from '@/components/Invoices'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/get-started',
    name: 'get-started',
    component: GetStartedView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/create-customer/:customerId/:index',
    name: 'create-customer',
    component: CreateCustomer
  },
  {
    path: '/customers',
    name: 'customers',
    component: Customers
  },
  {
    path: '/create-invoice/:invoiceId/:index',
    name: 'create-invoice',
    component: CreateInvoice
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: Invoices
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
