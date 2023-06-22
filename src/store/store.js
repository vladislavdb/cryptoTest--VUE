import { createStore} from "vuex";

const store = createStore({
    state() {
        return {
            check: false
        }
    }
})

export default store;