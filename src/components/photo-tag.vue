<template>
  <li class="photo-tag">
    <button
      ref="nameButton"
      class="name"
      :label="`${buttonlabel}${tag}`"
    >
    <img src="/src/assets/svg/x.svg" class="delete-indicator">{{ tag }}
    </button>
  </li>
</template>

<script>
export default{
  name: 'PhotoTag',
  props: {
    tag: {
      type: String,
      required: true
    },
    buttonlabel: {
      type: String,
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
    padding: 0.5em 0.5em 0.5em 0.5em;
    margin: 0 0.5em 0.5em 0;
    min-width: 42px;
    min-height: 42px;
    box-sizing: border-box;
    border: none;
  }
  .photo-tag>button.name{
    background-color: var(--inner-background-color);
    color: var(--text-color);
  }
  .delete-indicator{
    opacity: 0;
    display: inline-block;
    height: 1.5em;
    width: 0;
    margin-bottom: -0.35em;
    transition-duration: 0.15s;
    transition-property: width;
  }

  .edit.photo-tag>button.name{
    background-color: var(--warn-background-color);
    color: var(--warn-text-color);
  }
  .edit .delete-indicator{
    opacity: 0.8;
    width: 1.5em;
  }
</style>
