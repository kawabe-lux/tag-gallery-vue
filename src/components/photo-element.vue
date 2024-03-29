<template>
  <li class="photo-element" :class="{
    idle: photoStatus == 0,
    ready: photoStatus == 1,
    uploading: photoStatus == 2,
    done: photoStatus == 3,
    error: photoStatus == 4
  }">
    <button class="edit-button" :class="{ edit: editing }" @click="toggleEditing">{{ editing ? 'done' : 'edit'}}</button>
    <figure>
      <img class="photo-img" :src="src">
      <img role="presentation" v-if="photoStatus == 2 && srcPreview.length > 0" class="preview-img" :src="srcPreview">
      <div v-if="photoStatus == 2" class="upload-note">
        <img role="presentation" src="/src/assets/svg/chevrons-up.svg" alt="">
        <span>uploading...</span>
      </div>
      <button class="delete" :class="{ hidden: !editing }" label="delete photo" @click="deletePhoto">
        <img role="presentation" src="/src/assets/svg/trash-2.svg">
        delete
      </button>
      <figcaption>
        <ul class="photo-tag-list" ref="photoTagList">
          <photo-tag
            v-for="tag in tags"
            :key="tag"
            :tag="tag"
            :class="{ edit: editing }"
            :buttonlabel="editing ? 'filter by ' : 'remove '"
            :interactive="editing"
            @click="actionTag(tag)"
          />
          <li class="add-tag" :class="{ edit: editing }" @click="$nextTick(() => ($refs.tagInput.focus()))">
            <form>
              <input ref="tagInput" type="text" size="1" placeholder="tag name">
              <button type="submit" @click="addTag"><img src="/src/assets/svg/plus.svg" alt="" @click="$nextTick(() => ($refs.tagInput.focus()))"></button>
            </form>
          </li>
        </ul>
      </figcaption>
    </figure>
  </li>
</template>

<script>
import PhotoTag from './photo-tag.vue'
// import { useStore } from 'vuex'

// const store = useStore()
// console.log(store)

export default {
  name: 'PhotoElement',
  props: {
    src: {
      type: String,
      required: true
    },
    srcPreview: {
      type: String,
      default: () => ('')
    },
    tags: {
      type: Array,
      default: () => ([{ id: uuid4(), name: 'test' }])
    },
    id: {
      type: String,
      required: true
    },
    photoStatus: {
      type: Number,
      required: true
    },
  },
  data: () => ({
    editing: false
  }),
  methods: {
    toggleEditing () {
      this.editing = !this.editing
      if (this.editing){
        this.$refs.photoTagList.focus()
      }
    },
    actionTag (tagName) {
      if (this.editing){
        // remove tag
        console.log(tagName);
        this.$store.commit('photos/removeTag', {photoId: this.id, tagName: tagName});
        this.$store.commit('tags/removePhoto', {photoId: this.id, tagName: tagName});
      }
    },
    addTag (event) {
      event.preventDefault();
      this.$nextTick(() => (this.$refs.tagInput.focus()));
      const tagName = this.$refs.tagInput.value;
      if (tagName.length > 0){
        this.$store.commit('photos/addTag', {photoId: this.id, tagName: tagName});
        this.$store.commit('tags/add', {tagName: tagName, photoId: this.id}, {
          root: true,
        });
        this.$refs.tagInput.value = "";
      }
    },
    deletePhoto(){
        this.$store.commit('photos/removePhoto', this.id);
        this.tags.forEach((tagName) => {
          this.$store.commit('tags/removePhoto', {photoId: this.id, tagName: tagName});
        })
    }
  },
  components: {
    PhotoTag
  }
}
</script>

<style scoped>
  .photo-element{
    display: grid;
    grid-template-rows: 1fr auto;
    border: solid var(--layout-border-width) var(--border-color);
    background-color: var(--background-color);
    margin: 1em ;
    position: relative;
  }
  .photo-element:focus-within{
    border-color: var(--focus-color);
  }
  .photo-tag-list{
    display: flex;
    padding-left: 0;
    flex-wrap: wrap;
  }

  .photo-element.uploading>figure>img.photo-img{
    display: none;
  }

  button.delete{
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--shadow-color-alpha);
    color: var(--text-color);
    margin: 1rem;
    width: 17rem;
    height: 17rem;
    opacity: 0.7;
    transition-duration: 0.15s;
    transition-property: opacity, visibility;
    border: none;
  }
  button.delete.hidden{
    opacity: 0;
    visibility: hidden;
  }
  button.delete>img{
    filter: invert();
    opacity: 0.7;
  }

  button.delete:focus-within,
  button.delete:hover{
    opacity: 1;
  }

  .edit-button{
    margin: auto 0 0 0;
    border: none;
    border-radius: 0;
    width: 100%;
  }
  .edit.edit-button{
    background-color: var(--inner-background-color);
    color: var(--text-color);
  }

  li.add-tag{
    list-style: none;
    display: none;
    border-radius: 50em;
    transition-duration: 0.15s;
    transition-timing-function: ease-in-out;
    transition-property: width;
    box-sizing: border-box;
    min-width: 42px;
    min-height: 42px;
    width: 42px;
    height: 42px;
    background-color: var(--inner-background-color);
    overflow: hidden;
    margin-right: 7rem;
  }

  li.add-tag>form{
    display: flex;
    flex-direction: row;
  }

  .add-tag input{
    display: block;
    color: var(--background-color);
    background-color: var(--text-color);
    border: none;
    padding: 0;
    font-size: calc(0.75*var(--font-size));
    font-family: var(--text-font);;
    transition-duration: 0.15s;
    transition-timing-function: ease-in-out;
    transition-property: box-shadow, outline;
    border-radius: 50em;
    margin: 0;
    height: 42px;
    width: 0;
    box-sizing: border-box;
  }
  .add-tag input:hover{
    filter: drop-shadow( 2px 2px var(--focus-color));
  }
  .add-tag button{
    color: var(--background-color);
    background-color: var(--inner-background-color);
    border: none;
    border-radius: 50em;
    font-size: calc(1.5*var(--font-size));
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 42px;
    height: 42px;
  }
  .add-tag button>img{
    width: 1em;
    height: 1em;
    margin: 0;
    filter: invert();
  }
  li.add-tag:focus-within{
    width: unset;
    margin-right: 0;
  }

  .add-tag:focus-within input{
    background-color: var(--text-color);
    width: 7rem;
    padding: 0.5rem 0.5rem 0.5rem 0.8em;
    margin: 0 0.5rem 0 0;
  }
  .add-tag:focus-within button{
    background-color: var(--text-color);
  }
  .add-tag:focus-within button>img{
    filter: none;
  }


  .edit.add-tag{
    display: block;
  }

  figure{
    margin: 1rem;
    width: 17rem;
    grid-row: 1 / 2;
  }

  figure>img{
    width: 17rem;
    height: 17rem;
    object-fit: cover;
    margin: 0 0 1rem 0;
  }

  .upload-note{
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 15rem;
    height: 15rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: var(--shadow-color-alpha);
  }

  .upload-note img{
    filter: invert();
    animation-name: upload-anim;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    margin-bottom: 1em;
    width: 2em;
  }
  .upload-note span{
    background-color: var(--shadow-color-alpha);
    padding: 0.5em;
    border-radius: 10em;
  }

  @keyframes upload-anim{
    0%{
      transform: translateY(0);
    }
    5%{
      transform: translateY(-0.25em);
    }
    90%{
      transform: translateY(0);
    }
  }
</style>
