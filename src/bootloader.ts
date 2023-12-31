import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './style.scss';
import App from './App.vue';
import router from './router/index.ts';

function createVueApp() {
  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);

  app.use(router);

  return app;
}

export { createVueApp };