import { createRouter, createWebHistory } from "vue-router";
import PkIndexView from "@/views/pk/PkIndexView";
import RankListIndexView from "@/views/ranklist/RankListIndexView";
import RecordListIndexView from "@/views/record/RecordListIndexView";
import UserBotIndexView from "@/views/user/bot/UserBotIndexView";
import NotFoundView from "@/views/error/NotFoundView";
import UserAccountLoginView from "@/views/user/account/UserAccountLoginView";
import UserAccountRegisterView from "@/views/user/account/UserAccountRegisterView";

import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk/",
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PkIndexView,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/ranklist/",
    name: "rank_index",
    component: RankListIndexView,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/record/",
    name: "record_index",
    component: RecordListIndexView,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: UserBotIndexView,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/404/",
    name: "404",
    component: NotFoundView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/user/account/login/",
    name: "user_login_index",
    component: UserAccountLoginView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/user/account/register/",
    name: "user_register_index",
    component: UserAccountRegisterView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requestAuth && !store.state.user.is_login) {
    next({ name: "user_login_index" });
  } else {
    next();
  }
});

export default router;
