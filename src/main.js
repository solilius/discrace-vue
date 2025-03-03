import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initializeSdk } from './utils/initializeSdk';

if (window.location.hostname.includes("discordsays.com")) {
    initializeSdk();
}

createApp(App).mount('#app')