import photoService from '../../services/photo';
import uuid4 from 'uuid4'
import pStatus from './photoStatus'

export default{
    namespaced: true,
    state: () => ({
        byId: {},
        // allIds lists all photos **without** newPhoto
        allIds: [],
        // newPhotoId is ID of new photo not being uploading
        newPhotoId: '',
        selectedTagSet: []
    }),
    getters: {
        photoSet: (state) => {
            const set = state.allIds.map( photoId => state.byId[photoId] ).filter(
                // photo => photo.status == pStatus.DONE
                photo => [pStatus.DONE, pStatus.UPLOADING].includes(photo.status)
            );
            if (state.selectedTagSet.length == 0){
                return set;
            } else {
                return set.filter(photo => {
                    for (var i = state.selectedTagSet.length - 1; i >= 0; i--) {
                        if (photo.tags.includes(state.selectedTagSet[i]) == false){
                            return false
                        }
                    }
                    return true
                });
            }
        },
        newPhoto: (state) => [
            ...((state.allIds.map( photoId => state.byId[photoId] )).filter(
                photo => photo.status == pStatus.ERROR
            )),
            state.byId[state.newPhotoId] 
        ]
    },
    mutations: {
        add: (state, photo) => {
            state.byId[photo.id] = photo;
            if (state.allIds.includes(photo.id)) return;
            state.byId[photo.id].tagsByName = {};
            state.byId[photo.id].status = pStatus.DONE;
            state.byId[photo.id].srcPreview = '';
            state.byId[photo.id].tags.forEach((tag) => {
                state.byId[photo.id].tagsByName[tag] = true;
            });
            state.allIds.push(photo.id);
        },
        addNew: (state) => {
            //add new
            const photo = {
                id: uuid4(),
                status: pStatus.IDLE,
                tags: [],
                tagsByName: {},
                src: '',
                srcPreview: '/src/assets/svg/image.svg',
            }
            state.byId[photo.id] = photo;
            state.newPhotoId = photo.id;
        },
        setStatus: (state, {photoId: photoID, status: status}) => {
            console.log(photoID);
            console.log(state.byId[photoID]);
            const photo = state.byId[photoID];
            if (photo.status != status - 1 && status != pStatus.ERROR) {
                console.error(`photo.status: ${photo.status}, status: ${status}`);
                return;
            }
            switch (status) {
                case pStatus.UPLOADING:
                    state.allIds.push(photo.id);
                    break;
            }
            photo.status = status;
        },
        setSrc: (state, {photoId: photoID, src: src}) => {
            state.byId[photoID].src = src;
        },
        setSrcPreview: (state, {photoId: photoID, srcPreview: srcPreview}) => {
            state.byId[photoID].srcPreview = srcPreview;
        },
        addTag: (state, {photoId: photoId, tagName: tagName}) => {
            if (state.byId[photoId].tagsByName.hasOwnProperty(tagName)) return;
            state.byId[photoId].tagsByName[tagName] = true;
            state.byId[photoId].tags.push(tagName);
        },
        removeTag: (state, {photoId: photoId, tagName: tagName}) => {
            if (state.byId[photoId].tagsByName.hasOwnProperty(tagName) !== true) return;
            const index = state.byId[photoId].tags.indexOf(tagName);
            if (index > -1) {
                state.byId[photoId].tags.splice(index, 1);
            }
            // const array = state.byId[photoId].tags;
            // const index = state.byId[photoId].tags.indexOf(tagName);
            // state.byId[photoId].tags = [...array.slice(0, index), ...array.slice(index + 1)];
            delete state.byId[photoId].tagsByName[tagName];
        },
        removePhoto: (state, photoId) => {
            if (state.byId.hasOwnProperty(photoId) !== true) return;
            const index = state.allIds.indexOf(photoId);
            if (index > -1) {
                state.allIds.splice(index, 1);
                delete state.byId[photoId];
            }
        },
        selectTag: (state, tagName) => {
            if (state.selectedTagSet.includes(tagName)) return;
            state.selectedTagSet.push(tagName);
        },
        deselectTag: (state, tagName) => {
            const index = state.selectedTagSet.indexOf(tagName);
            if (index > -1) {
                state.selectedTagSet.splice(index, 1);
            }
        },
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
        uploadPhoto: async ({ commit }, {photoId: photoID, src: src}) => {
            photoService.upload(src, photoID, (uploadedSrc, photoID) => {
                commit('setSrc', {photoId: photoID, src: uploadedSrc});
                commit('setStatus', {photoId: photoID, status: pStatus.DONE});
            }, (photoID) => {
                commit('setStatus', {photoId: photoID, status: pStatus.ERROR});
            });
            
        },
    },
}