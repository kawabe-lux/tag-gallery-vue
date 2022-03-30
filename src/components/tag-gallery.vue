<template>
  <h2>filter by:</h2>
  <ul class="tag-list">
    <select-tag v-for="tag in tagSet" :key="tag.name" :tag="tag.name" />
  </ul>
  <ul class="gallery">
    <photo-element v-for="photo in photoSet" :key="photo.id" :tags="photo.tags"
      :photoStatus="photo.status" :src="photo.src" :srcPreview="photo.srcPreview"
      :id="photo.id" />
    <new-photo-element v-for="photo in newPhoto" :key="photo.id" :tags="photo.tags"
      :photoStatus="photo.status" :src="photo.src" :srcPreview="photo.srcPreview"
      :id="photo.id" />
  </ul>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import PhotoElement from "./photo-element.vue";
import SelectTag from "./select-tag.vue";
import NewPhotoElement from "./new-photo-element.vue";

const store = useStore();
store.dispatch("photos/load", null, { root: true });
const newPhoto = computed(() => {
  return store.getters["photos/newPhoto"];
});
const photoSet = computed(() => {
  return store.getters["photos/photoSet"];
});
const tagSet = computed(() => {
  return store.getters["tags/tagSet"];
});
store.commit("photos/addNew");
</script>
<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  border: solid var(--layout-border-width) var(--border-color);
  background-color: var(--inner-background-color);
  padding: 1em;
  margin-left: 1em;
}

h2 {
  display: inline;
  margin-left: 1em;
}

.tag-list {
  display: inline-flex;
  padding: 1em 1em 0 1em;
  flex-wrap: wrap;
}
</style>