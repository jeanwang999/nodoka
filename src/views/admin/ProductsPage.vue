<template>
<!-- vue-loading-overlay -->
<LoadingCp :active="isLoading"></LoadingCp>

<div class="text-end">
  <button class="btn btn-primary" type="button"
  @click="openModal(true)">
  增加一個產品</button>
</div>
<div>
  <input type="text" name="" id="" v-model="tempCategory">
  <button class="btn btn-primary" type="button"
  @click="addCategory(tempCategory)">
  新增分類</button>
</div>
<!-- <div>
  <input type="radio" name="" id="" v-for="item in products" :key="item.id">
  <label for="">{{ item.category }}</label>
</div> -->
<table class="table mt-4">
  <thead>
    <tr>
      <th width="120">分類</th>
      <th>圖片</th>
      <th>產品名稱</th>
      <th width="120">原價</th>
      <th width="120">售價</th>
      <th width="100">是否啟用</th>
      <th width="200">編輯</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in products" :key="item.id">
      <td>{{item.category}}</td>
      <td><img :src="`${item.imageUrl}`" alt="" style="height:100px"></td>
      <td>{{item.title}}</td>
      <td class="text-right">
        {{$filters.currency(item.origin_price) }}
      </td>
      <td class="text-right">
        {{ $filters.currency(item.price) }}
      </td>
      <td>
        <span class="text-success" v-if="item.is_enabled">啟用</span>
        <span class="text-muted" v-else>未啟用</span>

      </td>
      <td>
        <div class="btn-group">
          <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
          <button class="btn btn-outline-danger btn-sm"
          @click="openDelModal(item)">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<PaginationCp :pages="pagination" @emit-pages="getProducts"></PaginationCp>

<ProductModal ref="productModal"
:product="tempProduct"
@update-product="updateProduct"></ProductModal>

<DelModal ref="delModal"
:item="tempProduct" @del-item="delProduct"></DelModal>

</template>

<script>
// import LoadingPlugin from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/css/index.css';
import ProductModal from '../../components/admin/ProductModal.vue';
import PaginationCp from '../../components/PaginationCp.vue';
import DelModal from '../../components/admin/DelModal.vue';
// import { currency } from '../methods/filters';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      // selectCategory: '',
    };
  },
  components: { // 區域註冊
    ProductModal,
    DelModal,
    PaginationCp,
  },
  inject: ['emitter'],
  // computed: {
  //   filterCategory() {
  //     return this.products.filter((item) => item.name.match(this.selectCategory));
  //   },
  // },
  methods: {
    addCategory() {

    },
    // currency,
    getProducts(page = 1) { // 帶入產品資料
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;
      this.isLoading = true;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            console.log(res.data);
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          }
        });
    },
    openModal(isNew, item) {
      this.isLoading = true;
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item }; // ...展開的意思
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal; // ref 指定DOM
      productComponent.showModal();
      this.isLoading = false;
    },
    openDelModal(item) {
      this.tempProduct = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    delProduct() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(url).then((response) => {
        console.log(response.data);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getProducts();
        this.isLoading = false;
      });
    },
    updateProduct(item) { // 更新產品資料
      this.tempProduct = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((response) => { // 使用method 傳送資料至api
          console.log(response);
          productComponent.hideModal(); // 關掉Modal
          if (response.data.success) {
            this.getProducts();// 帶入產品資料
            this.emitter.emit('push-message', { // 觸發push-message事件
              style: 'success',
              title: '更新成功',
            });
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗',
              content: response.data.message.join('、'),
              // content 失敗的訊息內容 從後端傳來的
            });
          }
        });
    },

  },
  created() {
    this.getProducts();
  },
};
</script>
