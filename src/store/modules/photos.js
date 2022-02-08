import photoService from '../../services/photo';

export default{
    namespaced: true,
    state: () => ({
        byId: {},
        allIds: [],
    }),
    getters: {
        photoSet: (state) => state.allIds.map( photoId => state.byId[photoId] ),
    },
    mutations: {
        add: (state, item) => {
            state.byId[item.id] = item;
            if (state.allIds.includes(item.id)) return;
            state.allIds.push(item.id);
        }
    },
    actions: {
        load: async ({ commit }) => {
            const photos = await photoService.list();
            photos.forEach((item) => {
                commit('add', item);
                item.tags.forEach((tag) => {
                    commit('tags/add', {tag: tag, photoId: item.id}, {
                        root: true,
                    });
                })
            })
        },
    },
}