<template>
  <li class="photo-tag">
    <button
      ref="nameButton"
      class="name"
      @click="openMenu"
    >
    <span class="delete-indicator">–</span>
      {{ tag.name }}
    </button>
  </li>
</template>

<script>
export default{
  name: 'PhotoTag',
  props: {
    tag: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  .photo-tag{
    display: block;
    position: relative;
  }
  .photo-tag button{
    text-transform: none;
    padding: 0.5em 0.8em 0.5em 0.2em;
    margin: 0 0.5em 0.5em 0;
  }
  .photo-tag>button.name{
    min-width: 42px;
    min-height: 42px;
    box-sizing: border-box;
    background-color: var(--inner-background-color);
    border: none;
    color: var(--text-color);
  }
  .delete-indicator{
    opacity: 0;
  }

  .edit.photo-tag>button.name{
    background-color: var(--warn-background-color);
    color: var(--warn-text-color);
    padding: 0.5em 0.5em 0.5em 0.5em;
  }
  .edit .delete-indicator{
    opacity: 0.8;
  }
</style>
