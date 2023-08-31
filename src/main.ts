import { createVueApp } from './bootloader';

async function main() {
  const app = createVueApp();
  app.mount('#app');
}

main();