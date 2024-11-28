// import './assets/main.css'
import '@/styles/main.scss' // scss入口檔案
import 'element-plus/dist/index.css';
import 'virtual:svg-icons-register';
/*
Every Vue application starts by creating a new application instance with the createApp function:[https://vuejs.org/guide/essentials/application.html#the-application-instance]

import { createApp } from 'vue'

const app = createApp({
  // root component options //
})

*/
import { createApp } from 'vue';
import { createPinia } from 'pinia';
// import SvgIcon from '@/components/SvgIcon.vue'; // 上課時會解釋這個組件幹嘛用的
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

/*
Every app requires a "root component" that can contain other components as its children.
[https://vuejs.org/guide/essentials/application.html#the-root-component]
If you are using Single-File Components, we typically import the root component from another file:

import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)

*/
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 全局註冊 SvgIcon 組件，給自定義 icon 使用
// app.component('SvgIcon', SvgIcon);

/*
An application instance won't render anything until its .mount() method is called. It expects a "container" argument, which can either be an actual DOM element or a selector string:
[https://vuejs.org/guide/essentials/application.html#mounting-the-app]
- The content of the app's root component will be rendered inside the container element. 
- The container element itself is not considered part of the app.
- The .mount() method should always be called after all app configurations and asset registrations are done. 
- Also note that its return value, unlike the asset registration methods, is the root component instance instead of the application instance.
*/
app.mount('#app');
