<template>
    <LoadingCp :active="isLoading"></LoadingCp>
    <div class="container ">
      <div class="row my-5 justify-content-center">
        <!-- 購物車列表 -->
        <div class="col-md-8">
        <div class="sticky-top">
          <b>>>請確認購物車</b>
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
                <th>刪除</th>
              </tr>
            </thead>
            <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id" >
                <td>
                  <a @click="getProduct(item.product.id)">
                    <img :src="`${item.product.imageUrl}`" alt="" style="height: 100px;">
                  </a>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券{{ item.coupon.percent }}折
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <input type="number" class="form-control"
                    :disabled="item.id === status.loadingItem"
                    @change="updateCart(item)"
                          v-model.number="item.qty" min="1">
                    <div class="input-group-text">/ {{ item.product.unit }}</div>
                  </div>
                </td>
                <td class="text-end">
                  <small v-if="cart.final_total !== cart.total">
                    原價 {{ $filters.currency(item.total) }} <br>
                  </small>
                  <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                  {{ $filters.currency(item.final_total) }}
                </td>
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                          :disabled="status.loadingItem === item.id"
                          @click="removeCartItem(item.id)">
                    <i class="bi bi-x"></i>
                  </button>
                </td>
              </tr>
            </template>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ $filters.currency(cart.total) }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
            </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
        </div>

      </div>
      <div class="row my-5 justify-content-center">
        <!-- form 表單 -->
        <FormCp class="col-md-8 my-6" v-slot="{ errors }"
              @submit="createOrder">
          <b>>> 請輸入收件資料</b>
          <br><br>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <FieldCp id="email" name="email" type="email" class="form-control"
                    :class="{ 'is-invalid': errors['email'] }"
                    placeholder="請輸入 Email" rules="email|required"
                    v-model="form.user.email"></FieldCp>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <FieldCp id="name" name="姓名" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名" rules="required"
                    v-model="form.user.name"></FieldCp>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <FieldCp id="tel" name="電話" type="tel" class="form-control"
                    :class="{ 'is-invalid': errors['電話'] }"
                    placeholder="請輸入電話" rules="required"
                    v-model="form.user.tel"></FieldCp>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <FieldCp id="address" name="地址" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['地址'] }"
                    placeholder="請輸入地址" rules="required"
                    v-model="form.user.address"></FieldCp>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea name="" id="message" class="form-control" cols="30" rows="10"
                      v-model="form.message"></textarea>
          </div>
          <div class="text-center">
            <button class="btn btn-dark" @click="createOrder(0)">送出訂單</button>
          </div>
        </FormCp>

      </div>

  </div>
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
    addCart(id) {
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
        });
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        console.log(response);
        this.cart = response.data.data;
        this.isLoading = false;
        this.$emit('update-cart');
      });
    },
    // 數量改變時 更新cart
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
    removeCartItem(id) {
      this.status.loadingItem = id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.isLoading = true;
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, '移除購物車品項');
        this.status.loadingItem = '';
        this.getCart();
        this.isLoading = false;
      });
    },
    addCouponCode() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.isLoading = true;
      this.$http.post(url, { data: coupon })
        .then((res) => {
          console.log(res);
          this.$httpMessageState(res, '加入優惠券');
          this.getCart();
        });
    },
    createOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http.post(url, { data: order })
        .then((res) => {
          console.log(res);
          this.$httpMessageState(res, '新增訂單');
          // eslint-disable-next-line prefer-destructuring
          const orderId = res.data.orderId;
          console.log(orderId);
          // 假设这里是你返回的 orderId
          const checkoutRoute = { name: 'checkout', params: { orderId } };
          // 要使用指定路由名稱 (物件搭配 name 屬性 )進行頁面跳轉，在路由表也需要定義 name 屬性才可以正確配對。

          this.$router.push(checkoutRoute);
        });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>
