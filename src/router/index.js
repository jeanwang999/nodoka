import { createRouter, createWebHashHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/login',
    component: () => import('../views/LoginPage.vue'),
  },

  // dashboard
  {
    path: '/dashboard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/ProductsPage.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/OrdersPage.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/CouponsPage.vue'),
      },
    ],
  },
  // user
  {
    path: '/',
    component: () => import('../views/UserBoard.vue'),
    children: [
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue'),
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProduct.vue'),
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/UserCheckout.vue'),
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
