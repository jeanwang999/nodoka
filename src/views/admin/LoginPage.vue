<!-- eslint-disable vuejs-accessibility/no-autofocus -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>

<!-- vue-loading-overlay -->
<LoadingCp :active="isLoading"></LoadingCp>

  <div class="container mt-5">
    <form class="row justify-content-center"
    @submit.prevent="signIn">
    <!-- 加上prevent 避免觸發html預設事件-->
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            v-model="user.username"
            autofocus
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            v-model="user.password"
            required
          />
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      isLoading: false,
    };
  },
  methods: {
    signIn() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
            this.$router.push('/dashboard');
          }
        });
    },
  },
};
</script>
