<template>
    <section class="h-screen">
        <div class="px-6 h-full text-gray-800">
            <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                    <form @submit.prevent="goToDashBoard">
                        <!-- FirstName input -->
                        <div v-if="register" class="mb-6">
                            <input v-model="firstName" type="text"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                                id="firstName" placeholder="FirstName" required />
                        </div>
                        <!-- LastName input -->
                        <div v-if="register" class="mb-6">
                            <input v-model="lastName" type="text"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                                id="lastName" placeholder="LastName" required />
                        </div>
                        <!-- Email input -->
                        <div class="mb-6">
                            <input v-model="email" type="email"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                                id="email" placeholder="Email address" required />
                        </div>
                        <!-- Password input -->
                        <div class="mb-6">
                            <input v-model="password" type="password"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                                id="password" placeholder="Password" required />
                        </div>
                        <!-- Repeat Password input -->
                        <div v-if="register" class="mb-6">
                            <input v-model="repeatPassword" type="password"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                                id="repeatPassword" placeholder="Repeat Password" required />
                        </div>
                        <!-- `text-red-600 text-lg transition duration-200 ease-in-out${}` -->
                        <p
                            :class="wasError ? `text-red-600 text-lg transition duration-200 ease-in-out scale-100`:`scale-0`">
                            {{errorMsg}}</p> <br>
                        <div class="text-center lg:text-left">
                            <button type="submit"
                                class="inline-block px-7 py-3 bg-green-900 text-white font-large text-lg leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">
                                {{isLoading ? 'Loading...' : register ? 'Register' : 'login'}}
                            </button>
                            <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                                {{register ? `Have an account ? ` : `Don't have an account ? `}}
                                <button @click.prevent="register = !register"
                                    class="text-green-800 text-lg hover:text-green-600 focus:text-green-700 transition duration-200 ease-in-out">{{register
                                    ? ' login' : ' Register'}}
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
    name: 'get-started',
    data() {
        return {
            register: false,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: '',
        }
    },
    props: {

    },
    components: {

    },
    watch: {

    },
    computed: {
        ...mapState([
            'wasError',
            'errorMsg',
            'timeout',
            'isLoading'
        ])
    },
    methods: {
        ...mapActions([
            'clearError',
            'setError',
            'makeApiCall',
            'resetState',
        ]),
        async goToDashBoard() {
            try {
                let { register, firstName, lastName, email, password, repeatPassword } = this;
                if (register) {
                    // Registration
                    if (repeatPassword !== password) {
                        this.password = '';
                        this.repeatPassword = '';
                        this.clearError({});
                    };
                    await this.makeApiCall({
                        urlSuffix: '/auth/register',
                        params: { email, password, firstName, lastName },
                        method: 'post',
                        routeTo: {
                            name: 'dashboard',
                            queryProps: ['userId', 'fullName']
                        },
                        router: this.$router,
                        setAs: 'userInfo',
                        toLocal: true,
                    });
                    return;
                };
                // Login
                await this.makeApiCall({
                    urlSuffix: '/auth/login',
                    params: { email, password },
                    method: 'post',
                    routeTo: {
                        name: 'dashboard',
                        queryProps: ['userId', 'fullName']
                    },
                    router: this.$router,
                    setAs: 'userInfo',
                    toLocal: true,
                });
            } catch (error) {
                this.setError(error);
                this.clearError({});
            }
        }
    },
    mounted() {
        localStorage.removeItem('userInfo');
        // this.resetState();
    }
}

</script>
