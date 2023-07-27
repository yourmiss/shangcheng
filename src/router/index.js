import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Product from "../views/Product"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: "",
        name: "Product",
        component: Product,
        meta: {
          isLogin: true
        }
      },
      {
        path: "params",
        name: "Params",
        component: () => import("../views/Params"),
        meta: {
          isLogin: true
        }
      },
      {
        path: "content",
        name: "Content",
        component: () => import("../views/Content"),
        meta: {
          isLogin: true
        }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User"),
    meta: {
      isLogin: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
