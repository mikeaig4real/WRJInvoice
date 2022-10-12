import axios from 'axios'

const initialState = {
    displayText: 'Get Started',
    wasError: false,
    errorMsg: '',
    isLoading: false,
    timeout: null,
    userInfo: null,
    customers: null,
    payments: null,
    invoices: null,
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

const getInvoices = async (state, { }) => {
    try {
        if (!state.userInfo) await getItem(state, { itemName: 'userInfo' });
        await makeApiCall(state, {
            urlSuffix: '/invoice',
            method: 'get',
            options: {
                "Authorization": `Bearer ${state?.userInfo?.token || JSON.parse(localStorage.getItem('userInfo'))?.token}`
            },
            setAs: 'invoices',
            toLocal: false,
        });
        state.invoices.forEach((invoice) => {
            invoice.dueDate = invoice.dueDate.slice(0, 10);
        });
    } catch (error) {
        throw new Error(error);
    }
};

const registerUser = async (state, { email, password, firstName, lastName, router }) => {
    try {
        await makeApiCall(state, {
            urlSuffix: '/auth/register',
            params: { email, password, firstName, lastName },
            method: 'post',
            routeTo: {
                name: 'dashboard',
                queryProps: ['userId', 'fullName']
            },
            router,
            setAs: 'userInfo',
            toLocal: true,
        });
    } catch (error) {
        throw new Error(error);
    }
};

const loginUser = async (state, { email, password, router }) => {
    try {
        await makeApiCall(state, {
            urlSuffix: '/auth/login',
            params: { email, password },
            method: 'post',
            routeTo: {
                name: 'dashboard',
                queryProps: ['userId', 'fullName']
            },
            router,
            setAs: 'userInfo',
            toLocal: true,
        });
    } catch (error) {
        throw new Error(error);
    }
};

const getCustomers = async (state, { }) => {
    try {
        if (!state.userInfo) await getItem(state, { itemName: 'userInfo' });
        await makeApiCall(state, {
            urlSuffix: '/customer',
            method: 'get',
            options: {
                "Authorization": `Bearer ${state?.userInfo?.token || JSON.parse(localStorage.getItem('userInfo'))?.token}`
            },
            setAs: 'customers',
            toLocal: false,
        });
    } catch (error) {
        throw new Error(error);
    }
};

const getPayments = async (state, { }) => {
    try {
        if (!state.userInfo) await getItem(state, { itemName: 'userInfo' });
        await makeApiCall(state, {
            urlSuffix: '/payment',
            method: 'get',
            options: {
                "Authorization": `Bearer ${state?.userInfo?.token || JSON.parse(localStorage.getItem('userInfo')).token}`
            },
            setAs: 'payment',
            toLocal: false,
        });
    } catch (error) {
        throw new Error(error);
    }
};

const deleteInvoice = async (state, { invoicedId }) => {
    try {
        if (!state.userInfo) await getItem(state, { itemName: 'userInfo' });
        await makeApiCall(state, {
            urlSuffix: `/invoice/${invoicedId}`,
            method: 'delete',
            options: {
                "Authorization": `Bearer ${state?.userInfo?.token || JSON.parse(localStorage.getItem('userInfo')).token}`
            },
        });
        await getInvoices(state, {});
    } catch (error) {
        throw new Error(error);
    }
}

export default {
    makeApiCall,
    setItem,
    getItem,
    clearError,
    setError,
    resetState,
    getInvoices,
    registerUser,
    loginUser,
    getCustomers,
    getPayments,
    deleteInvoice,
};