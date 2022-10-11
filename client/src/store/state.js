import axios from 'axios'

export default {
    displayText: 'Get Started',
    wasError: false,
    errorMsg: '',
    isLoading: false,
    timeout: null,
    userInfo: null,
    invoices: [],
    baseUrl: 'http://localhost:8081/api/v1',
    caller: axios,
};