import axios from 'axios'

const initialState = {
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

const resetState = (state, { }) => {
    state.displayText = initialState.displayText;
    state.wasError = initialState.wasError;
    state.errorMsg = initialState.errorMsg;
    state.isLoading = initialState.isLoading;
    state.timeout = initialState.displayText;
    state.displayText = initialState.displayText;
    state.userInfo = initialState.displayText;
    state.invoices = initialState.displayText;
    state.baseUrl = initialState.displayText;
    state.caller = initialState.caller;
};

const setItem = (state, { item, itemName, toLocal = false }) => {
    state[itemName] = item;
    toLocal && localStorage.setItem(itemName, JSON.stringify(item));
};

const getItem = (state, { itemName }) => {
    const storedItem = JSON.parse(localStorage.getItem(itemName));
    if (!storedItem) return storedItem;
    state[itemName] = storedItem;
    return storedItem;
}

const clearError = (state, { time = 3000 }) => {
    state.timeout = setTimeout(() => {
        state.wasError = false;
        state.errorMsg = '';
        clearTimeout(state.timeout);
        state.timeout = null;
    }, time);
};

const setError = (state, { message }) => {
    state.wasError = true;
    state.errorMsg = message;
};

const makeApiCall = async (state, { urlSuffix, params = {}, method, options = {}, routeTo = null, router = null, setAs = '', toLocal = false }) => {
    try {
        state.isLoading = true;
        const { data: response } = await state.caller({ method, url: `${state.baseUrl}${urlSuffix}`, params, headers: options });
        if (!response.success) {
            setError({ message });
            clearError({});
            return;
        };
        setAs && setItem(state, { item: response.data, itemName: setAs, toLocal })
        if (routeTo) {
            const { queryProps, name } = routeTo;
            const query = queryProps.reduce((acc, curr) => {
                acc[curr] = response.data[curr];
                return acc;
            }, {});
            router.push({ name, query });
        };
    } catch ({ response: { data: { message } } }) {
        setError(state, { message });
        clearError(state, {});
        throw new Error(message);
    } finally {
        state.isLoading = false;
    };
};

export default {
    makeApiCall,
    setItem,
    getItem,
    clearError,
    setError,
    resetState,
};