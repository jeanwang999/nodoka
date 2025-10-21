<!-- eslint-disable max-len -->
<template>
  <!-- nav -->
  <nav class="navbar navbar-expand-lg bg-light text-uppercase fs-6 p-3 border-bottom align-items-center">
    <div class="container-fluid">
      <div class="row justify-content-between align-items-center w-100">
        <div class="col-auto">
          <router-link to="/home">
            <div to="/"
              :style="{ backgroundImage: `url(${headerLogoBg})` }"
              class="d-block header-logo-img"
              style="width: 160px; height: 40px; background-repeat: no-repeat; background-size: 100%">
            </div>
          </router-link>
        </div>
        <div class="col-auto">
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>

            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 gap-1 gap-md-5 pe-3">
                <li class="nav-item" data-bs-dismiss="offcanvas">
                  <router-link class="nav-link" to="/products">Product</router-link>
                </li>
                <li class="nav-item" data-bs-dismiss="offcanvas">
                  <router-link class="nav-link" to="/cart">Cart</router-link>
                </li>
                <li class="nav-item dropdown" >
                  <a class="nav-link dropdown-toggle active" href="#" id="dropdownHome" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">Category</a>
                  <ul class="dropdown-menu list-unstyled" aria-labelledby="dropdownHome">
                    <li data-bs-dismiss="offcanvas">
                      <a href="" class="dropdown-item item-anchor">
                        <router-link class="nav-link" to="/products">全部商品</router-link>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item" data-bs-dismiss="offcanvas">
                  <router-link class="nav-link" to="/contact">Contact</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-3 col-lg-auto">
          <ul class="list-unstyled d-flex m-0">
            <!-- cart -->
            <li class="d-none d-lg-block">
              <a href="index.html" class="text-uppercase mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart"
                aria-controls="offcanvasCart">Cart <span class="cart-count">({{ carts.length }})</span>
              </a>
            </li>
            <!-- cart m -->
            <li class="d-lg-none">
              <a href="#" class="mx-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart"
                aria-controls="offcanvasCart">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <use xlink:href="#cart"></use>
                </svg>
              </a>
            </li>
            <!-- search -->
            <li class="search-box mx-2">
              <a href="" class="search-button" @click.prevent="showSearch = true">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <use xlink:href="#search"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>

      </div>

    </div>
  </nav>

  <!-- slide cart -->
  <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasCart" aria-labelledby="My Cart">
  <div class="offcanvas-header justify-content-center">
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div class="order-md-last">
      <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-primary">購物車</span>
        <span class="badge bg-primary rounded-pill">{{
                    carts.length
                  }}</span>
      </h4>
      <ul class="list-group mb-3" v-if="cart.carts">
        <li class="list-group-item d-flex justify-content-between lh-sm" v-for="item in cart.carts" :key="item.id">
          <div>
            <h6 class="my-0">{{ item.product.title }}</h6>
            <small class="text-body-secondary">
              {{ item.qty }} {{ item.product.unit }}
            </small>
          </div>
          <span class="text-body-secondary">{{ item.total }}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <span>Total (TWD)</span>
          <strong>{{ $filters.currency(cart.total) }}
          </strong>
        </li>
      </ul>

      <button class="w-100 btn btn-primary btn-lg" type="submit"  data-bs-dismiss="offcanvas">
        <router-link class="nav-link" to="/cart" >繼續結帳</router-link>
        </button>
    </div>
  </div>
  </div>

  <!-- popup serch  -->
  <div class="search-popup" :class="{ active: showSearch }">
    <div class="search-popup-container">
      <form role="search" method="get" class="form-group" action="">
        <input type="search" id="search-form" class="form-control border-0 border-bottom"
          placeholder="請輸入要搜尋的商品" value="" name="s" v-model="search" @input.prevent="openList(true)" />
        <button type="submit" class="search-submit border-0 position-absolute bg-white"
          style="top: 15px;right: 15px;"><svg class="search" width="24" height="24">
            <use xlink:href="#search"></use>
          </svg></button>

      </form>
      <!-- search result list -->
      <div class="header-dropdown-search-menu jq-header-dropdown-search-menu"
            style="display: none;" v-show="isSearchMenuVisible">
            <table class="table my-5">
              <thead>
                <th colspan="2" class="py-0">
                  <small class="text-muted">搜尋結果</small>
                </th>
              </thead>
              <tbody>
                <tr v-for="item in searchResultArray" :key="item.id">
                  <th scope="row" @click.prevent="showSearch = false" class="text-start">
                    <a
                      href="#"
                      class="header-dropdown-search-menu-link"
                      @click.prevent="getProduct(item.id)"
                      >{{ item.title }}</a
                    >
                  </th>
                  <td class="text-right">
                    {{ item.price }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="searchResultArray.length === 0">
                  <td colspan="2"><span class="text-danger">無此產品</span></td>
                </tr>
              </tfoot>
            </table>
      </div>

      <!-- <h5 class="cat-list-title">Browse Categories</h5>
      <ul class="cat-list">
        <li class="cat-list-item">
          <a href="#" title="Jackets">Jackets</a>
        </li>
        <li class="cat-list-item">
          <a href="#" title="T-shirts">T-shirts</a>
        </li>
      </ul> -->
    </div>
  </div>

</template>

<script>

export default {
  props: {
    cartUpdated: Boolean,
  },
  watch: {
    cartUpdated() {
      this.getCart();// 每次 props 改變時就執行
    },
  },
  name: 'NavbarUser',
  data() {
    return {
      headerLogoBg: 'images/nodoka-logo.png',
      products: [],
      product: {},
      cart: {},
      carts: {},
      coupon_code: '',
      status: {
        loadingItem: '', // 對應品項 id
      },
      search: '',
      searchResultArray: [],
      showSearch: false,
      isSearchMenuVisible: false,
    };
  },
  methods: {
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
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        console.log(response);
        this.cart = response.data.data;
        this.carts = [...response.data.data.carts];
        this.isLoading = false;
        console.log('購物車有', this.carts.length, '個商品');
      });
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`);
      console.log(id);
      this.search = '';
      this.isSearchMenuVisible = false;
      this.searchResultArray = '';
    },
    openList(isSearch = false) {
      // 判斷是否為 search dropdown
      if (isSearch) {
        // 當 search 為空值，隱藏 search dropdown
        if (this.search === '') {
          this.isSearchMenuVisible = false;
          return;
        }
        this.isSearchMenuVisible = true;
        this.searchProducts();
      }
    },
    searchProducts() {
      // 使用 filter 過濾空值,透過 match 找出要搜尋的產品
      this.searchResultArray = this.products.filter((item) => item.title.match(this.search));
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },

};

</script>
