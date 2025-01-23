<template>
    <nav class="navbar navbar-expand-lg ">
      <div class="container-fluid">
        <div to="/" :style="{ backgroundImage: `url(${headerLogoBg})` }"
        class="d-block header-logo-img" style="width: 90px;height: 90px;
        background-repeat: no-repeat; background-size: cover;"></div>

        <router-link class="navbar-brand" to="/cart"></router-link>
      </div>
    </nav>
    <div class="container-fluid mt-3 position-relative">
      <ToastMessages></ToastMessages>
      <h4>Userboard</h4>
      <router-view/>
    </div>
</template>

<script>
import emitter from '../methods/emitter';
import ToastMessages from '../components/ToastMessages.vue';

export default {
  data() {
    return {
      headerLogoBg: 'http://isukho.com/wp-content/uploads/2024/06/Black-Elegant-Modern-Name-Initials-Monogram-Logo.png',
    };
  },
  components: {
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
  created() {
  },
};
</script>
