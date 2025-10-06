import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/Globalstyle/fonts.css";
import "ol/ol.css";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Add the icon to the library
library.add(faMap);
const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App);

// ✅ Register the font-awesome component globally
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(PrimeVue); // ✅ (you were importing PrimeVue but forgot to use it)
app.use(ConfirmationService);
app.use(ToastService);

app.mount("#app");
