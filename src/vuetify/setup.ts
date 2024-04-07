import { App } from "vue";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as vuetifyComponents from "vuetify/components";

import "vuetify/styles";

export const useVuetify = (app: App) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
  });
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
