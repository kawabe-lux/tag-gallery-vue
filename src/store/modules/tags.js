export default{
    namespaced: true,
    state: () => ({
        byTag: {},
        allTags: [],
    }),
    getters: {
        tagSet: (state) => state.allTags.map( tagId => state.byTag[tagId] ),
    },
    mutations: {
        add: (state, {tagName: tagName, photoId: photoId}) => {
            if (state.byTag.hasOwnProperty(tagName) !== true){
                state.byTag[tagName] = {name: tagName};
            }
            if (state.byTag[tagName].hasOwnProperty('photos') !== true){
                state.byTag[tagName].photos = {};
            }
            if (state.byTag[tagName].photos.hasOwnProperty(photoId) !== true){
                state.byTag[tagName].photos[photoId] = true;
            }
            if (state.allTags.includes(tagName)) return;
            state.allTags.push(tagName);
        },
        removePhoto: (state, {tagName: tagName, photoId: photoId}) => {
            if (state.byTag.hasOwnProperty(tagName) !== true) return;
            if (state.byTag[tagName].hasOwnProperty('photos') !== true) return;
            if (state.byTag[tagName].photos.hasOwnProperty(photoId) !== true) return;
            delete state.byTag[tagName].photos[photoId];
            if (Object.keys(state.byTag[tagName].photos).length === 0){
                delete state.byTag[tagName];
                state.allTags.splice(state.allTags.indexOf(tagName), 1);
            }

        }
    },
}