<!-- eslint-disable max-len -->
<template>
    <LoadingCp :active="isLoading"></LoadingCp>
    <section class="blog py-5">
    <div class="container">
      <div class="row mt-4">
        <div class="col-md-2">
          <div class="mt-5 category-item">
            <a
              href="#"
              class="list-group-item list-group-item-action"
              @click.prevent="categoryName = ''"
              :class="{ active: categoryName === '' }"
              >全部商品</a>
            <a
              v-for="(item, index) in filterCategory"
              :key="index"
              href="#"
              class="list-group-item list-group-item-action"
              @click.prevent="categoryName = item"
              :class="{ active: categoryName === item }"  >
              {{ item }}
            </a>
          </div>
        </div>
        <div class="col-md-10">
          <div class="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
            <h4 class="text-uppercase" v-if="categoryName === ''">全部商品</h4>
            <h4 class="text-uppercase" v-else>{{ categoryName }}</h4>
            <a href="index.html" class="btn-link">View All</a>
          </div>
      <div class="row" >
        <div class="col-md-4 " v-for="item in filterProduct" :key="item.id" >
          <div class="product-item image-zoom-effect link-effect">
              <div class="image-holder">
                <a  @click="getProduct(item.id)" >
                  <img :src="`${item.imageUrl}`" alt="categories" class="product-image img-fluid">
                </a>
                <a href="" class="btn-icon btn-wishlist">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <use xlink:href="#heart"></use>
                  </svg>
                </a>
                <div class="product-content">
                  <h5 class="text-uppercase fs-5 mt-3">
                    <a  @click="getProduct(item.id)">{{item.title}}</a>
                  </h5>
                  <a  class="text-decoration-none" data-after="加入購物車" :disabled="this.status.loadingItem === product.id"
                  @click="addCart(item.id)"><span>${{item.price}}</span></a>
                </div>
              </div>
            </div>
        </div>
      </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>

export default {
  props: ['category'],
  data() {
    return {
      products: [],
      product: {},
      cart: {},
      coupon_code: '',
      status: {
        loadingItem: '', // 對應品項 id
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      orderId: '',
      categoryName: '',
      allProducts: [],

    };
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        this.products = response.data.products;
        console.log('products:', response);
        this.isLoading = false;
      });
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },

    // 取得全部商品 (分類用)
    getAllProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        this.allProducts = response.data.products;
        console.log('products:', response);
        this.isLoading = false;
        console.log('取得全部商品for分類');
        console.log('✅ filterCategory:', this.filterCategory); // ←放這裡最保險
      });
    },
    addCart(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.loadingItem = id; // 當它等於id  btn addcart disable
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http.post(url, { data: cart })
        .then((res) => {
          this.status.loadingItem = ''; // ajax載入之後 再把id清空
          console.log(res);
          this.$httpMessageState(res, '加入購物車');
          this.getCart();
          this.isLoading = false;
        });
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((response) => {
        console.log(response);
        this.cart = response.data.data;
      });
    },
    updateCart(item) {
      // console.log(item);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.isLoading = true;
      this.status.loadingItem = item.id; // 當它等於id  btn addcart disable
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      this.$http.put(url, { data: cart }).then((res) => {
        console.log(res);
        this.status.loadingItem = '';
        this.getCart();
      });
    },
  },
  computed: {
    filterProduct() {
      const self = this;
      // 當為 空值 時，便回傳 全部商品 (有分頁)
      if (self.categoryName === '') {
        return self.products;
      }
      // 過濾 分類 相同的產品
      return self.allProducts.filter(
        (item) => item.category === self.categoryName,
      );
    },
    filterCategory() {
      const self = this;
      return self.allProducts
        .map((item) => item.category)
        .filter((item, index, array) => array.indexOf(item) === index);
    },
  },
  created() {
    this.categoryName = this.$route.query.category || ''; // 如果其他頁面有傳遞 分類 的參數，便使用其值
    this.getProducts();
    this.getAllProducts();
    this.getCart();
  },
};
</script>

<style>
.category-item a{
  margin-bottom: 20px;
}
.category-item a:hover{
  scale: 0.95;
  transition: 0.5s;
}
.category-item a.active {
  font-weight: bold;
}

</style>
