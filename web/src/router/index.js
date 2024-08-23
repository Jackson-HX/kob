import { createRouter, createWebHistory } from "vue-router";
import PkIndexView from "@/views/pk/PkIndexView";
import RankListIndexView from "@/views/ranklist/RankListIndexView";
import RecordListIndexView from "@/views/record/RecordListIndexView";
import UserBotIndexView from "@/views/user/bot/UserBotIndexView";
import NotFoundView from "@/views/error/NotFoundView";
import UserAccountLoginView from "@/views/user/account/UserAccountLoginView";
import UserAccountRegisterView from "@/views/user/account/UserAccountRegisterView";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk/",
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PkIndexView,
  },
  {
    path: "/ranklist/",
    name: "rank_index",
    component: RankListIndexView,
  },
  {
    path: "/record/",
    name: "record_index",
    component: RecordListIndexView,
  },
  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: UserBotIndexView,
  },
  {
    path: "/404/",
    name: "404",
    component: NotFoundView,
  },
  {
    path: "/user/account/login/",
    name: "user_login_index",
    component: UserAccountLoginView,
  },
  {
    path: "/user/account/register/",
    name: "user_register_index",
    component: UserAccountRegisterView,
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

export default router;
