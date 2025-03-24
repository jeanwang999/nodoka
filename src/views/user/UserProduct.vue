<template>
    <LoadingCp :active="isLoading"></LoadingCp>
    <div class="container product-single-page" >
      <nav aria-label="breadcrumb ">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">商品</li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>
      <div class="row justify-content-center">
        <article class="col-lg-6 col-sm-12">
          <img :src="product.imageUrl" alt="" class="img-fluid mb-3 ">
        </article>
        <div class="col-lg-4 col-sm-12">
          <h5>{{ product.title }}</h5>
          <br>
          <p>{{ product.description }}</p>

          <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
          <br>
          <del class="h6" v-if="product.price">{{ product.origin_price.toLocaleString() }} 元</del>
          <div class="h5" v-if="product.price">TWD {{ product.price.toLocaleString() }} 元</div>
          <hr>
          <div class="flex ">
            <div class="col-lg-2 mt-1">
              <label for="" class="form-label" >數量</label>
            </div>
            <div class="col-lg-4">
              <input type="number" v-model="qtySelect" class="mb-3 ms-2 form-control"> <br>
            </div>
          </div>
          <div class="text-end">
            <button type="button" class="btn btn-outline-danger"
            :disabled="this.status.loadingItem === product.id"
                    @click="addToCart(product.id)">
                    <div v-if="this.status.loadingItem === product.id"
                        class="spinner-grow text-danger spinner-grow-sm" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
              加到購物車
            </button>
          </div>
        </div>
      </div>
      <div class="row justify-content-center my-3">
        <div class="col-lg-6 col-sm-12">
          <hr>
          <div>{{ product.content }}</div>
        </div>
        <div class="col-4 ">
        </div>

      </div>
    </div>
</template>
<script>

export default {
  data() {
    return {
      product: {},
      id: '',
      qtySelect: 1,
      status: {
        loadingItem: '',
      },
    };
  },

  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.isLoading = false;
        if (response.data.success) {
          this.product = response.data.product;
        }
      });
    },
    addToCart(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.loadingItem = id;
      // 當它等於id 則 btn addcart disable
      const cart = {
        product_id: id,
        qty: this.qtySelect,
      };
      this.isLoading = true;
      this.$http.post(url, { data: cart }).then((response) => {
        this.isLoading = false;
        this.$httpMessageState(response, '加入購物車');
        this.$router.push('/cart');
        this.status.loadingItem = '';
      });
    },
  },
  created() {
    this.id = this.$route.params.productId; // 從path取得id
    this.getProduct();
  },
};
</script>
<style lang="scss" scoped>
article h2{
  color: red;
}
.product-single-page nav{
  margin: 30px 0;
  border-bottom: #ccc solid 1px ;
}
</style>
