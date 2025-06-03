import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

import vuetify from './plugins/vuetify';
import router from './router';

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(createPinia());

app.mount('#app');
