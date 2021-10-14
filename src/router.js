import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardUser = () => import("./components/BoardUser.vue")
const ForgotPass = () => import("./components/ForgotPass.vue")
const CalculatorVue = () => import("./components/Calculator.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  {
    path: "/calc",
    name: "calc",
    // lazy-loaded
    component: CalculatorVue,
  },
  {
    path: "/forgotpass",
    name: "forgotpass",
    // lazy-loaded
    component: ForgotPass,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;