// ✅ Correct Order
import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "./components/LandingPage.vue"; // this MUST come before it's used
import Dashboard from "./Pages/Dashboard/Dashboard.vue";
import Logout from "./components/Logout.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./components/LandingPage.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("./Pages/Dashboard/Dashboard.vue"),
  },
  {
    path: "/admin-tools",
    name: "AdminTools",
    component: () => import("./Pages/AdminTools/AdminTools.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("./components/Logout.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
