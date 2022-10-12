export default {
    makeApiCall: ({ commit }, payload = {}) => {
        commit('makeApiCall', payload);
    },
    setItem: ({ commit }, payload = {}) => {
        commit('setItem', payload);
    },
    getItem: ({ commit }, payload = {}) => {
        commit('getItem', payload);
    },
    clearError: ({ commit }, payload = {}) => {
        commit('clearError', payload);
    },
    setError: ({ commit }, payload = {}) => {
        commit('setError', payload);
    },
    resetState: ({ commit }, payload = {}) => {
        commit('resetState', payload);
    },
    getInvoices:({ commit }, payload = {}) => {
        commit('getInvoices', payload);
    },
    registerUser:({ commit }, payload = {}) => {
        commit('registerUser', payload);
    },
    loginUser:({ commit }, payload = {}) => {
        commit('loginUser', payload);
    },
    getCustomers:({ commit }, payload = {}) => {
        commit('getCustomers', payload);
    },
    getPayments:({ commit }, payload = {}) => {
        commit('getPayments', payload);
    },
    deleteInvoice:({ commit }, payload = {}) => {
        commit('deleteInvoice', payload);
    },
};