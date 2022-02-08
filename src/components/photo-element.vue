<template>
  <li class="photo-element">
    <figure>
      <img :src="src">
      <figcaption>
        <ul class="photo-tag-list" ref="photoTagList">
          <photo-tag
            v-for="tag in tags"
            :key="tag.name"
            :tag="tag"
            @destroy="removeTag"
            :class="{ edit: editing }"
          />
          <li class="add-tag" :class="{ edit: editing }" @click="$nextTick(() => ($refs.tagInput.focus()))">
            <input ref="tagInput" type="text" size="1">
            <button type="submit" @click="$nextTick(() => ($refs.tagInput.focus()))">+</button>
          </li>
        </ul>
      </figcaption>
    </figure>
    <button class="edit-button" :class="{ edit: editing }" @click="toggleEditing">{{ editing ? 'done' : 'edit'}}</button>
  </li>
</template>

<script>
import PhotoTag from './photo-tag.vue'

export default {
  name: 'PhotoElement',
  props: {
    src: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      default: () => ([{ id: uuid4(), name: 'test' }])
    }
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
    removeTag (event) {
      const index = this.tags.indexOf(event)
      this.$delete(this.tags, index)
    }/*,
    addTag (event) {
    }*/
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
  }
  .photo-element:focus-within{
    border-color: var(--focus-color);
  }
  .photo-tag-list{
    display: flex;
    padding-left: 0;
    flex-wrap: wrap;
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
    flex-direction: row;
    margin-right: 10em;
  }

  .add-tag>input{
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
  .add-tag>input:hover{
    filter: drop-shadow( 2px 2px var(--focus-color));
  }
  .add-tag>button{
    color: var(--background-color);
    background-color: var(--inner-background-color);
    border: none;
    border-radius: 50em;
    font-size: calc(1.5*var(--font-size));
    margin: 0;
    padding: 0.2em 0 0 0;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 42px;
    height: 42px;
  }
  li.add-tag:focus-within{
    width: unset;
    margin-right: 0;
  }

  .add-tag:focus-within>input{
    background-color: var(--text-color);
    width: 10em;
    padding: 0.5em 0.5em 0.5em 0.8em;
    margin: 0 0.5em 0 0;
  }
  .add-tag:focus-within>button{
    background-color: var(--text-color);
  }


  .edit.add-tag{
    display: flex;
  }


  figure{
    margin: 1em;
    width: 17em;
  }

  img{
    width: 17em;
    height: 17em;
    object-fit: cover;
    margin: 0 0 1em 0;

  }
</style>
