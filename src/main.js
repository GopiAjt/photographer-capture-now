import './assets/main.css'

import store from './stores/store';
import { definePreset } from '@primevue/themes';
import { createApp } from 'vue'
import 'primeicons/primeicons.css'; // Import PrimeIcons CSS
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';


import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import SplitButton from 'primevue/splitbutton';
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import AutoComplete from 'primevue/autocomplete';
import InputNumber from 'primevue/inputnumber';
import Password from 'primevue/password';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import MultiSelect from 'primevue/multiselect';
import Divider from 'primevue/divider';
import SpeedDial from 'primevue/speeddial';
import Rating from 'primevue/rating';
import Textarea from 'primevue/textarea';
import Panel from 'primevue/panel';
import Avatar from 'primevue/avatar';
import Paginator from 'primevue/paginator';
import Galleria from 'primevue/galleria';
import ProgressSpinner from 'primevue/progressspinner';
import DatePicker from 'primevue/datepicker';
import Drawer from 'primevue/drawer';
import InputMask from 'primevue/inputmask';
import Fieldset from 'primevue/fieldset';
import InputOtp from 'primevue/inputotp';
import Tag from 'primevue/tag';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Menu from 'primevue/menu';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import RadioButton from 'primevue/radiobutton';
import ScrollPanel from 'primevue/scrollpanel';
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';

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


app.component('Toolbar', Toolbar);
app.component('Button', Button);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('InputText', InputText);
app.component('SplitButton', SplitButton);
app.component('Dialog', Dialog);
app.component('Card', Card);
app.component('Tabs', Tabs);
app.component('TabList', TabList);
app.component('Tab', Tab);
app.component('TabPanels', TabPanels);
app.component('TabPanel', TabPanel);
app.component('AutoComplete', AutoComplete);
app.component('InputNumber', InputNumber);
app.component('Password', Password);
app.component('Toast', Toast);
app.component('MultiSelect', MultiSelect);
app.component('Divider', Divider);
app.component('SpeedDial', SpeedDial);
app.component('Rating', Rating);
app.component('Textarea', Textarea);
app.component('Panel', Panel);
app.component('Avatar', Avatar);
app.component('Paginator', Paginator);
app.component('Galleria', Galleria);
app.component('ProgressSpinner', ProgressSpinner);
app.component('DatePicker', DatePicker);
app.component('Drawer', Drawer);
app.component('InputMask', InputMask);
app.component('Fieldset', Fieldset);
app.component('InputOtp', InputOtp);
app.component('Tag', Tag);
app.component('Accordion', Accordion);
app.component('AccordionPanel', AccordionPanel);
app.component('AccordionHeader', AccordionHeader);
app.component('AccordionContent', AccordionContent);
app.component('Menu', Menu);
app.component('ConfirmPopup', ConfirmPopup);
app.component('ConfirmDialog', ConfirmDialog);
app.component('RadioButton', RadioButton);
app.component('ScrollPanel', ScrollPanel);
app.component('Stepper', Stepper);
app.component('StepList', StepList);
app.component('StepPanels', StepPanels);
app.component('StepItem', StepItem);
app.component('Step', Step);
app.component('StepPanel', StepPanel);
app.use(router)
app.use(store);
app.use(ToastService);
app.use(ConfirmationService);
app.mount('#app')
