<template>
  <ul class="gallery">
    <photo-element
      v-for="photo in photoSet"
      :key="photo.id"
      :tags="photo.tags"
      :src="photo.src"
      :id="photo.id"
    />
  </ul>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import PhotoElement from './photo-element.vue'
  const store = useStore()
  store.dispatch('photos/load', null, { root: true })
  const photoSet = computed (() => {
    return store.getters['photos/photoSet']
  })

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
