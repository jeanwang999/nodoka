<template>
  <Navbar></Navbar>
  <h3>Dashboard</h3>
  <router-view/>

</template>
<script>
import Navbar from '../components/NavbarComp.vue';

export default {
  components: {
    Navbar,
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
