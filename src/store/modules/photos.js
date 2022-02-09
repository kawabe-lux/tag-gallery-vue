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
        add: (state, photo) => {
            state.byId[photo.id] = photo;
            if (state.allIds.includes(photo.id)) return;
            state.byId[photo.id].tagsByName = {};
            state.byId[photo.id].tags.forEach((tag) => {
                state.byId[photo.id].tagsByName[tag] = true;
            });
            state.allIds.push(photo.id);
        },
        addTag: (state, {photoId: photoId, tagName: tagName}) => {
            if (state.byId[photoId].tagsByName.hasOwnProperty(tagName)) return;
            state.byId[photoId].tagsByName[tagName] = true;
            state.byId[photoId].tags.push(tagName);
        },
        removeTag: (state, {photoId: photoId, tagName: tagName}) => {
            if (state.byId[photoId].tagsByName.hasOwnProperty(tagName) !== true) return;
            state.byId[photoId].tags.splice(state.byId[photoId].tags.indexOf(tagName), 1);
            // const array = state.byId[photoId].tags;
            // const index = state.byId[photoId].tags.indexOf(tagName);
            // state.byId[photoId].tags = [...array.slice(0, index), ...array.slice(index + 1)];
            delete state.byId[photoId].tagsByName[tagName];
        },
        removePhoto: (state, photoId) => {
            if (state.byId.hasOwnProperty(photoId) !== true) return;
            state.allIds.splice(state.allIds.indexOf(photoId), 1);
            delete state.byId[photoId];
        }
    },
    actions: {
        load: async ({ commit }) => {
            const photos = await photoService.list();
            photos.forEach((item) => {
                commit('add', item);
                item.tags.forEach((tagName) => {
                    commit('tags/add', {tagName: tagName, photoId: item.id}, {
                        root: true,
                    });
                })
            })
        },
    },
}