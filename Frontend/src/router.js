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
    path: "/damage-locations",
    name: "Damage-locations",
    component: () => import("./Pages/DamageLocations/Damage-Location.vue"),
  },
  {
    path: "/jurisdiction",
    name: "Jurisdiction",
    component: () => import("./Pages/DamageLocations/Damage-Location.vue"),
  },
  {
    path: "/trafficData",
    name: "TrafficData",
    component: () => import("./Pages/TrafficData/Traffic-Data.vue"),
    children: [
      {
        path: "", // default child
        name: "TrafficMap",
        component: () => import("./components/MapForTrafficCount.vue"),
      },
      {
        path: "reporting",
        name: "TrafficReporting",
        component: () => import("./Pages/TrafficData/Traffic-Reporting.vue"),
      },
    ],
  },


  {
    path: "/motorway-facilities",
    name: "Motorway-Facilities",
    component: () => import("./Pages/TrafficData/Traffic-Data.vue"),
  },
  {
    path: "/road-conditions",
    name: "Road-Conditions",
    component: () => import("./Pages/TrafficData/Traffic-Data.vue"),
  },
  {
    path: "/potiential-revenue-calculator",
    name: "Potential-revenue-calculator",
    component: () => import("./Pages/TrafficData/Traffic-Data.vue"),
  },
  {
    path: "/Editdata",
    name: "EditData",
    component: () => import("./Pages/EditData/Edit-Data.vue"),
  },
  {
    path: "/Rams",
    name: "Rams",
    component: () => import("./Pages/RAMS/Rams.vue"),
  },
  {
    path: "/CreateUser",
    name: "CreateUser",
    component: () => import("./Pages/createUser/Create-User.vue"),
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
    path: "/login",
    name: "Login",
    component: () => import("./components/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("./components/Signup.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

