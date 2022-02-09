<template>
  <ul class="gallery">
    <photo-element
      v-for="photo in photoSet"
      :key="photo.id"
      :tags="photo.tags"
      :photoStatus="photo.status"
      :src="photo.src"
      :srcPreview="photo.srcPreview"
      :id="photo.id"
    />
    <new-photo-element 
      v-for="photo in newPhoto"
      :key="photo.id"
      :tags="photo.tags"
      :photoStatus="photo.status"
      :src="photo.src"
      :srcPreview="photo.srcPreview"
      :id="photo.id"
    />
  </ul>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import PhotoElement from './photo-element.vue'
  import NewPhotoElement from './new-photo-element.vue'

  const store = useStore()
  store.dispatch('photos/load', null, { root: true })
  const newPhoto = computed(() => {
    return store.getters['photos/newPhoto']
  })
  const photoSet = computed (() => {
    return store.getters['photos/photoSet']
  })
  store.commit('photos/addNew');

</script>

<style scoped>
.gallery{
  display: flex;
  flex-wrap: wrap;
  border: solid var(--layout-border-width) var(--border-color);
  background-color: var(--inner-background-color);
  padding: 1em;
  margin-left: 1em;
}
</style>
