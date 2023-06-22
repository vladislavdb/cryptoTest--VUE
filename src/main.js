import { createApp } from 'vue'
import App from './App'
import componentsUI from '@/components/UI'
import VclickOutside from "@/directives/VclickOutside";
import store from "@/store/store";

const app = createApp(App);

componentsUI.forEach(component => {
    app.component(component.name, component)
})

app.use(store)
    .directive("click-outside", VclickOutside)
    .mount('#app')
