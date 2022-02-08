<template>
  <li class="photo-element">
    <figure>
      <img :src="src">
    </figure>
  </li>
</template>

<script>

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
  data: () => ({}),
  methods: {
    removeTag (event) {
      const index = this.tags.indexOf(event)
      this.$delete(this.tags, index)
    }
  }
}
</script>

<style scoped>
  .photo-element{
    display: block;
    border: solid var(--layout-border-width) var(--border-color);
    background-color: var(--background-color);
    margin: 1em;
  }
  .photo-element:focus-within{
    border-color: var(--focus-color);
  }
  .photo-tag-list{
    display: flex;
    padding-left: 0;
  }

  figure{
    margin: 1em;
  }

  img{
    width: 15em;
    height: 15em;
    object-fit: cover;
    margin-bottom: 1em;
  }
</style>
