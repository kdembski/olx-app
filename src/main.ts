import { createApp } from "vue";
import App from "./App.vue";
import { useVuetify } from "@/vuetify/setup";

import "./demos/ipc";
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const app = createApp(App);
useVuetify(app);

app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
