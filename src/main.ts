import "./demos/ipc";
import App from "./App.vue";
import { createApp } from "vue";
import { useVuetify } from "@/vuetify/setup";
import { createPinia } from "pinia";
import { router } from "@/router";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
useVuetify(app);

app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
