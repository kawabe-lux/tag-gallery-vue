import { createStore } from 'vuex'
import photos from './modules/photos'
import tags from './modules/tags'


const store = createStore({
    modules: {
        photos,
        tags
    }
})

export default store
