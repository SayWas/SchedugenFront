import {createStore} from 'vuex'

const store = createStore({
    state: {
        access_token: localStorage.getItem('user-token') || '',
        page_is_loaded: false
    },
    mutations: {
        setAccessToken(state, token) {
            state.access_token = token
            localStorage.setItem('user-token', token)
        },
        setLoaded(state, loaded) {
            state.page_is_loaded = loaded
        }
    }
})

export default store