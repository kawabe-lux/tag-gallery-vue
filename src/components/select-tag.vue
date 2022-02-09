<template>
  <li class="select-tag">
    <button
      ref="nameButton"
      class="name"
      :label="`filter by ${tag}`"
      @click="selectTag"
      type="button"
      :aria-pressed="selected ? 'true' : 'false'"
    >
      {{ tag }}
    </button>
  </li>
</template>

<script>
export default{
  name: 'SelectTag',
  props: {
    tag: {
      type: String,
      required: true
    }
  },
  data: () => ({
    selected: false
  }),
  methods: {
    selectTag () {
      if (this.selected === false) {
        this.$store.commit('photos/selectTag', this.tag); 
      } else {
        this.$store.commit('photos/deselectTag', this.tag); 
      }
      this.selected = !this.selected;
    }
  }
}
</script>

<style scoped>
  .select-tag{
    display: block;
    position: relative;
  }
  .select-tag button{
    text-transform: none;
    padding: 0.5em 0.5em 0.5em 0.5em;
    margin: 0 0.5em 0.5em 0;
    min-width: 42px;
    min-height: 42px;
    box-sizing: border-box;
    border: none;
  }
  .select-tag>button.name{
    background-color: var(--inner-background-color);
    color: var(--text-color);
  }

  .select-tag>button.name[aria-pressed="true"]{
    background-color: var(--text-color);
    color: var(--background-color);
  }
</style>
