// main.js or main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // <-- import router

createApp(App).use(router).mount("#app"); // <-- use router
