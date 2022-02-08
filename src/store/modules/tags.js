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
        add: (state, item) => {
            if (state.byTag.hasOwnProperty(item.tag.name) == false){
                state.byTag[item.tag.name] = item.tag;
                console.log(item.tag);
            }
            if (state.byTag[item.tag.name].hasOwnProperty('photos') == false){
                state.byTag[item.tag.name].photos = {};
            }
            if (state.byTag[item.tag.name].photos.hasOwnProperty(item.photoId) == false){
                state.byTag[item.tag.name].photos[item.photoId] = true;
            }
            if (state.allTags.includes(item.tag.name)) return;
            state.allTags.push(item.tag.name);
        }
    },
}