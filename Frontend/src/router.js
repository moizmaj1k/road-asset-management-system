// ✅ Correct Order
import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "./components/LandingPage.vue"; // this MUST come before it's used
import Dashboard from "./Pages/Dashboard/Dashboard.vue";
import Logout from "./components/Login.vue";
import AdminTools from "./Pages/AdminTools/AdminTools.vue";
import Add from "./Pages/AdminTools/Add.vue";
import Edit from "./Pages/AdminTools/Edit.vue";



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
    path: "/Editdata",
    name: "EditData",
    component: () => import("./Pages/EditData/Edit-Data.vue"),
  },
  {
    path: "/TrafficData",
    name: "TrafficData",
    component: () => import("./Pages/TrafficData/Traffic-Data.vue"),
  },
  {
    path: "/admin-tools",
    component: AdminTools,
    children: [
      { path: "", redirect: "/admin-tools/add" },
      { path: "add", name: "AdminToolsAdd", component: Add },
      { path: "edit", name: "AdminToolsEdit", component: Edit },
    ],
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("./components/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

