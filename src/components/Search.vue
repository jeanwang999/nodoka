<template>
    <form>
      <div class="form-group position-relative">
        <label for="search" id="searchLabel">
          <span class="material-icons">search</span>
        </label>
        <input
          class="form-control search"
          type="search"
          placeholder="搜尋"
          id="search"
          ref="search"
          :value="search"
          @input="$emit('update:search', $refs.search.value)"
        >
      </div>
    </form>
  </template>

<script>
export default {
  name: 'SearchCp',
  props: ['search'],
  watch: {
    $route() {
      this.$emit('update:search', '');
    },
  },
};
</script>
