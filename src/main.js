import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { DiscordSDK } from '@discord/embedded-app-sdk';

if (window.location.hostname.includes("discordsays.com")) {

    const discordSDK = new DiscordSDK("1344758737231020245");

    async function setupDiscordSDK() {
        await discordSDK.ready();
        console.log("setupDiscordSDK");
    }

    setupDiscordSDK();
}

createApp(App).mount('#app')