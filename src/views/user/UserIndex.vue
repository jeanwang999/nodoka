<!-- eslint-disable indent -->
<!-- eslint-disable max-len -->
<template>
    <LoadingCp :active="isLoading"></LoadingCp>

  <section id="billboard" class="bg-light py-5">
    <div class="container">
      <div class="row justify-content-center">
        <h1 class="section-title text-center mt-4" data-aos="fade-up">New Collections</h1>
        <div class="col-md-6 text-center" data-aos="fade-up" data-aos-delay="300">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptas ut dolorum consequuntur, adipisci
            repellat! Eveniet commodi voluptatem voluptate, eum minima, in suscipit explicabo voluptatibus harum,
            quibusdam ex repellat eaque!</p>
        </div>
      </div>
      <div class="row">
        <div class="swiper main-swiper py-4" data-aos="fade-up" data-aos-delay="600">
          <div class="swiper-wrapper d-flex border-animation-left">
            <div class="swiper-slide cursor-pointer" v-for="item in products" :key="item.id" @click="getProduct(item.id)">
              <div class="banner-item image-zoom-effect" >
                <div class="image-holder">
                  <img :src="`${item.imageUrl}`" alt="product" class="img-fluid">
                </div>
                <div class="banner-content py-4">
                  <h5 class="element-title text-uppercase">
                    <div class="item-anchor" >{{item.title}}</div>
                  </h5>
                  <p>{{item.description}}</p>
                  <div class="btn-left">
                    <div class="btn-link fs-6 text-uppercase item-anchor text-decoration-none" >Discover Now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="icon-arrow icon-arrow-left"><svg width="50" height="50" viewBox="0 0 24 24">
            <use xlink:href="#arrow-left"></use>
          </svg></div>
        <div class="icon-arrow icon-arrow-right"><svg width="50" height="50" viewBox="0 0 24 24">
            <use xlink:href="#arrow-right"></use>
          </svg></div>
      </div>
    </div>
  </section>

  <section class="features py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-3 text-center" data-aos="fade-in" data-aos-delay="0">
          <div class="py-5">
            <svg width="38" height="38" viewBox="0 0 24 24">
              <use xlink:href="#calendar"></use>
            </svg>
            <h4 class="element-title text-capitalize my-3">Book An Appointment</h4>
            <p>At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
          </div>
        </div>
        <div class="col-md-3 text-center" data-aos="fade-in" data-aos-delay="300">
          <div class="py-5">
            <svg width="38" height="38" viewBox="0 0 24 24">
              <use xlink:href="#shopping-bag"></use>
            </svg>
            <h4 class="element-title text-capitalize my-3">Pick up in store</h4>
            <p>At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
          </div>
        </div>
        <div class="col-md-3 text-center" data-aos="fade-in" data-aos-delay="600">
          <div class="py-5">
            <svg width="38" height="38" viewBox="0 0 24 24">
              <use xlink:href="#gift"></use>
            </svg>
            <h4 class="element-title text-capitalize my-3">Special packaging</h4>
            <p>At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
          </div>
        </div>
        <div class="col-md-3 text-center" data-aos="fade-in" data-aos-delay="900">
          <div class="py-5">
            <svg width="38" height="38" viewBox="0 0 24 24">
              <use xlink:href="#arrow-cycle"></use>
            </svg>
            <h4 class="element-title text-capitalize my-3">free global returns</h4>
            <p>At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="best-sellers" class="best-sellers product-carousel py-5 position-relative overflow-hidden">
    <div class="container">
      <div class="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
        <h4 class="text-uppercase">Best Selling Items</h4>
        <a href="index.html" class="btn-link">View All Products</a>
      </div>
      <div class="swiper product-swiper open-up" data-aos="zoom-out">
        <div class="swiper-wrapper d-flex">
          <div class="swiper-slide" v-for="item in products" :key="item.id">
            <div class="product-item image-zoom-effect link-effect">
              <div class="image-holder">
                <a href="index.html">
                  <img :src="`${item.imageUrl}`" alt="categories" class="product-image img-fluid">
                </a>
                <a href="index.html" class="btn-icon btn-wishlist">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <use xlink:href="#heart"></use>
                  </svg>
                </a>
                <div class="product-content">
                  <h5 class="text-uppercase fs-5 mt-3">
                    <a href="index.html">{{item.title}}</a>
                  </h5>
                  <a  class="text-decoration-none" data-after="加入購物車" :disabled="this.status.loadingItem === product.id"
                  @click="addCart(item.id)"><span>${{item.price}}</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="icon-arrow icon-arrow-left"><svg width="50" height="50" viewBox="0 0 24 24">
          <use xlink:href="#arrow-left"></use>
        </svg></div>
      <div class="icon-arrow icon-arrow-right"><svg width="50" height="50" viewBox="0 0 24 24">
          <use xlink:href="#arrow-right"></use>
        </svg></div>
    </div>
  </section>

</template>

<script>
export default {
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
    };
  },
  name: 'UserHomepage',
  mounted() {
    console.log('✅ UserHomepage.vue 已掛載，開始載入 JS...');
    this.reloadAllScripts();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log('🔄 Vue Router 進入 UserHomepage，重新載入 JS...');
      setTimeout(() => {
        vm.reloadAllScripts();
      }, 300);
    });
  },
  methods: {
    // 載入js
    reloadAllScripts() {
      setTimeout(() => {
        console.log('🔄 檢查 jQuery 是否存在...');
        if (typeof window.jQuery === 'undefined') {
          console.warn('⚠️ jQuery is missing, 重新載入 jQuery 和 Plugins...');
          this.loadScripts([
            '/js/jquery.min.js',
            '/js/plugins.js',
            '/js/script.min.js',
          ]);
        } else {
          console.log('✅ jQuery 已載入，載入 Plugins 和 Script...');
          this.loadScripts([
            '/js/plugins.js',
            '/js/script.min.js',
          ]);
        }
      }, 300);
    },
    loadScripts(scripts) {
      return scripts.reduce((promise, src) => promise.then(() => new Promise((resolve, reject) => {
        console.log(`📥 載入 JS: ${src}`);
        const script = document.createElement('script');
        script.src = src;
        script.async = false; // 確保按順序載入
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      })), Promise.resolve());
    },

    // 載入 產品
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
  created() {
    this.getProducts();
    this.getCart();
  },

};
</script>
