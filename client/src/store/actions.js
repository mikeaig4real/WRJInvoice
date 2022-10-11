export default {
    makeApiCall: ({ commit }, payload) => {
        commit('makeApiCall', payload);
    },
    setItem: ({ commit }, payload) => {
        commit('setItem', payload);
    },
    getItem: ({ commit }, payload) => {
        commit('getItem', payload);
    },
    clearError: ({ commit }, payload) => {
        commit('clearError', payload);
    },
    setError: ({ commit }, payload) => {
        commit('setError', payload);
    },
    resetState: ({ commit }, payload) => {
        commit('resetState', payload);
    }
};