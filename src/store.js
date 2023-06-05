import {createStore} from 'vuex'

const store = createStore({
    state: {
        api_link: 'https://231735.fornex.cloud/api/',
        // api_link: 'https://schedugen.pythonanywhere.com/api/',
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