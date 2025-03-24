import { createRouter, createWebHashHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/login',
    component: () => import('../views/admin/LoginPage.vue'),
  },

  // dashboard
  {
    path: '/dashboard',
    component: () => import('../views/admin/DashBoard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/ProductsPage.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/admin/OrdersPage.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/CouponsPage.vue'),
      },
    ],
  },
  // user
  {
    path: '/',
    component: () => import('../views/user/UserBoard.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/user/UserIndex.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/user/UserCart.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/user/UserProducts.vue'),
      },
      {
        path: 'product/:productId',
        component: () => import('../views/user/UserProduct.vue'),
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/user/UserCheckout.vue'),
        name: 'checkout',
        // 要使用指定路由名稱 (物件搭配 name 屬性 )進行頁面跳轉，在路由表也需要定義 name 屬性才可以正確配對。
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
