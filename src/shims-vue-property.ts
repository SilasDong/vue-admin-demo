import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route } from 'vue-router'

declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    $util: object,
    $router: VueRouter,
    $route: Route
  }
}
