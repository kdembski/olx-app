import { App } from "vue";
import { createVuetify } from "vuetify";
import * as vuetifyComponents from "vuetify/components";

import "vuetify/styles";

export const useVuetify = (app: App) => {
  const vuetify = createVuetify();
  app.use(vuetify);
  registerComponents(app);
};

const registerComponents = (app: App) => {
  Object.keys(vuetifyComponents).forEach((component) => {
    app.component(
      component,
      vuetifyComponents[component as keyof typeof vuetifyComponents]
    );
  });
};
