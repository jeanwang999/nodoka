<template>
  <Navbar></Navbar>
  <div class="container-fluid position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>
<script>
import emitter from '../methods/emitter';
import ToastMessages from '../components/ToastMessages.vue';
import Navbar from '../components/NavbarComp.vue';

export default {
  components: {
    Navbar,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    console.log(token);
    this.$http.defaults.headers.common.Authorization = token;
    // 透過header發送token
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api, this.user).then((res) => {
      console.log(res);
      if (!res.data.success) {
        this.$router.push('/login');
      }
    });
  },
};

</script>
<!-- <script>
const obj = {
  key: 'value',
};
console.log(obj);
</script> -->
