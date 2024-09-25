import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';


import Button from "primevue/button"

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});


app.component('Button', Button);
app.component('Card', Card);
app.component('InputText', InputText);

app.use(router)

app.mount('#app')
