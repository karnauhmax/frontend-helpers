import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import './assets/base.scss';

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { CoCloudDownload, BiTrash, CoCopy, BiArrowDownShort } from 'oh-vue-icons/icons';

addIcons(CoCopy, CoCloudDownload, BiTrash, BiArrowDownShort);

const app = createApp(App);

app.component('v-icon', OhVueIcon);

app.use(router);

app.mount('#app');
