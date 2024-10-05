import './assets/main.css'

import store from './stores/store';
import { definePreset } from '@primevue/themes';
import { createApp } from 'vue'
import 'primeicons/primeicons.css'; // Import PrimeIcons CSS
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputOtp from 'primevue/inputotp';
import Menu from 'primevue/menu';
import Password from 'primevue/password';
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Textarea from 'primevue/textarea';
import Avatar from 'primevue/avatar';

import Button from "primevue/button"
import Toolbar from 'primevue/toolbar';
const app = createApp(App)
const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{yellow.50}',
            100: '{yellow.100}',
            200: '{yellow.200}',
            300: '{yellow.300}',
            400: '#ffff00',
            500: '{yellow.500}',
            600: '{yellow.600}',
            700: '{yellow.700}',
            800: '{yellow.800}',
            900: '{yellow.900}',
            950: '{yellow.950}'
        }
    }
});
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
});


app.component('Button', Button);
app.component('Card', Card);
app.component('InputOtp', InputOtp);
app.component('InputText', InputText);
app.component('Toolbar', Toolbar);
app.component('Menu', Menu);
app.component('Stepper', Stepper);
app.component('StepList', StepList);
app.component('StepPanels', StepPanels);
app.component('StepItem', StepItem);
app.component('Step', Step);
app.component('StepPanel', StepPanel);
app.component('Password', Password);
app.component('Textarea', Textarea);
app.component('Avatar', Avatar);
app.use(router)
app.use(store);
app.mount('#app')
