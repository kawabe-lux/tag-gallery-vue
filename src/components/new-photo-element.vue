<template>
  <li class="photo-element" :class="{
    idle: photoStatus == 0, 
    ready: photoStatus == 1, 
    uploading: photoStatus == 2, 
    done: photoStatus == 3, 
    error: photoStatus == 4
  }">
    <figure>
      <form>
        <label for="upload-input">
          <img role="presentation" ref="photoPreview" :src="srcPreview.length == 0 ? '/src/assets/svg/image.svg' : srcPreview">
          <span>{{ photoStatus == 0 ? 'upload file' : (photoStatus == 1 || photoStatus == 4 ? 'change file' : '') }}</span>
          <input ref="fileInput" id="upload-input" type="file" v-on:change="setPreview">
        </label>
        <button ref="fileSubmit" type="submit" @click="startUpload"><img src="/src/assets/svg/upload.svg"> {{ photoStatus == 1 ? 'upload' : 'try upload again'}}</button>
      </form>
      <figcaption>
        <ul class="photo-tag-list" ref="photoTagList">
          <photo-tag
            v-for="tag in tags"
            :key="tag"
            :tag="tag"
            class="edit"
            @click="removeTag(tag)"
            :buttonlabel="'remove '"
          />
          <li class="add-tag edit" @click="$nextTick(() => ($refs.tagInput.focus()))">
            <form>
              <input ref="tagInput" type="text" size="1" placeholder="tag name">
              <button type="submit" @click="addTag"><img src="/src/assets/svg/plus.svg" alt=""></button><!-- ; $nextTick(() => ($refs.tagInput.focus())) -->
            </form>
          </li>
        </ul>
      </figcaption>
    </figure>
  </li>
</template>

<script>
import PhotoTag from './photo-tag.vue'
import pStatus from '../store/modules/photoStatus'

export default {
  name: 'NewPhotoElement',
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
      default: () => ([])
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
    editing: true
  }),
  methods: {
    setPreview () {
      console.log(window.URL.createObjectURL(this.$refs.fileInput.files[0]))
      const previewSrc = window.URL.createObjectURL(this.$refs.fileInput.files[0]);
      this.$refs.photoPreview.src = previewSrc;
      this.$store.commit('photos/setSrcPreview', {
        photoId: this.id,
        srcPreview: previewSrc
      });
      this.$store.commit('photos/setStatus', {photoId: this.id, status: pStatus.READY});
    },
    startUpload (event) {
      event.preventDefault();
      console.log('startUpload');
      this.$store.dispatch('photos/uploadPhoto', {photoId: this.id, src: this.srcPreview});
      this.$store.commit('photos/setStatus', {photoId: this.id, status: pStatus.UPLOADING});
      this.$store.commit('photos/addNew');
    },
    removeTag (tagName) {
        // remove tag
        console.log(tagName);
        this.$store.commit('photos/removeTag', {photoId: this.id, tagName: tagName});
        this.$store.commit('tags/removePhoto', {photoId: this.id, tagName: tagName});
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
  .photo-element:focus-within,
  .photo-element.error:focus-within{
    border-color: var(--focus-color);
  }
  .photo-element.error{
    background-color: var(--warn-background-color);
    border: dashed calc(var(--layout-border-width)*2) var(--border-color);
  }
  .photo-tag-list{
    display: flex;
    padding-left: 0;
    flex-wrap: wrap;
  }

  .photo-element.ready>figure>img,
  .photo-element.error>figure>img,
  .photo-element.idle>figure>img{
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
    padding: 0.5rem 0.5rem 0.5rem 0.8rem;
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
    margin: 1em;
    width: 17em;
  }

  figure>img{
    width: 17em;
    height: 17em;
    object-fit: cover;
    margin: 0 0 1rem 0;
  }

  .photo-element>figure>form{
    width: 17rem;
    height: 17rem;
    margin: 0 0 1rem 0;
    display: block;
    position: relative;
  }
  .photo-element>figure>form>label{
    display: block;
    text-align: center;
    width: 100%;
    height: 100%;
    transition-property: outline, box-shadow;
    transition-duration: 0.15s;
    background-color: var(--inner-background-color);
    border-radius: var(--interactives-border-width);
    font-weight: bold;
  }
  .photo-element.ready>figure>form>label,
  .photo-element.error>figure>form>label{
    height: 12.75rem;
    width: 12.75rem;
    margin-bottom: 1rem;
    margin-left: 2.125rem;
  }
  .photo-element>figure>form>label:focus-within{
    outline-style: solid;
    outline-color: var(--focus-color);
    outline-width: 0.2rem;
  }
  .photo-element>figure>form>label:hover{
    box-shadow: 2px 2px var(--focus-color);
  }
  .photo-element.idle>figure>form>label>img{
    display: block;
    width: 34%;
    height: 34%;
    padding: 33% 33% 4% 33%;
    text-align: center;
  }
  .photo-element.ready>figure>form>label>img,
  .photo-element.error>figure>form>label>img{
    display: block;
    width: 12.75rem;
    height: 12.75rem;
    padding-bottom: 5%;
    text-align: center;
    object-fit: cover;
  }
  .photo-element.ready>figure>form>label>span,
  .photo-element.error>figure>form>label>span{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 2.125rem;
    top: 0;
    width: 12.75rem;
    height: 12.75rem;
    opacity: 0;
    background-color: var(--shadow-color-alpha);
  }
  .photo-element.ready>figure>form>label:focus-within>span,
  .photo-element.ready>figure>form>label:hover>span,
  .photo-element.error>figure>form>label:focus-within>span,
  .photo-element.error>figure>form>label:hover>span{
    opacity: 1;
  }

  .photo-element>figure>form>label>input[type="file"]{
    display: none;
    position: absolute;
    width: 17rem;
    height: 17rem;
    top: 0;
    left: 0;
    text-align: center;
    overflow: hidden;
    opacity: 0;
  }
  .photo-element.idle>figure>form>label>input[type="file"],
  .photo-element.error>figure>form>label>input[type="file"],
  .photo-element.ready>figure>form>label>input[type="file"]{
    display: block;
  }
  .photo-element.ready>figure>form>label>input[type="file"],
  .photo-element.error>figure>form>label>input[type="file"]{
    height: 12.75rem;
    width: 12.75rem;
    left: 2.125rem;
  }
  .photo-element>figure>form>button[type="submit"]{
    display: none;
    width: 17rem;
    height: 3.4rem;
    text-align: center;
    overflow: hidden;

  }
  .photo-element.ready>figure>form>button[type="submit"],
  .photo-element.error>figure>form>button[type="submit"]{
    display: block;
  }

</style>
