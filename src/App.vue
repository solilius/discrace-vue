<script setup>
import UnityWebGL from 'unity-webgl';
import VueUnity from 'unity-webgl/vue';

if (window.location.hostname.includes("discordsays.com")) {
    const originalFetch = window.fetch;
    window.fetch = (input, init) => {
        const url = typeof input === "string" ? input : input.url;

        switch (url) {
            case "https://player-auth.services.api.unity.com/v1/authentication/session-token":
                return originalFetch("/unity/auth/session-token", init);

            case "https://player-auth.services.api.unity.com/v1/authentication/anonymous":
                return originalFetch("/unity/auth/anonymous", init);

            case "https://relay-allocations.services.api.unity.com/v1/regions":
                return originalFetch("/unity/relay/regions", init);

            case "https://relay-allocations.services.api.unity.com/v1/allocate":
                return originalFetch("/unity/relay/allocate", init);

            case "https://relay-allocations.services.api.unity.com/v1/joincode":
                return originalFetch("/unity/relay/joincode", init);

            case "https://relay-allocations.services.api.unity.com/v1/join":
                return originalFetch("/unity/relay/join", init);
            default:
                return originalFetch(input, init);
        }
    };

    const OriginalWebSocket = window.WebSocket;
    window.WebSocket = function (url, protocols) {
        if (url.includes("relay.cloud.unity3d.com")) {
        
            const subdomain = url.split(".relay.cloud.unity3d.com")[0].replace("wss://", "");
            return new OriginalWebSocket(`/unity/relay/socket/${subdomain}`, protocols);
        }
        return new OriginalWebSocket(url, protocols);
    };
}

// Initialize Unity instance
const unityInstance = new UnityWebGL({
    loaderUrl: '/Build/WebGL.loader.js',
    dataUrl: '/Build/WebGL.data.gz',
    frameworkUrl: '/Build/WebGL.framework.js.gz',
    codeUrl: '/Build/WebGL.wasm.gz',
    companyName: 'Alchemist Labs',
    productName: 'Discrace',
    productVersion: '0.1',
});

unityInstance.addUnityListener('gameStart', (msg) => {
  alert(msg);
  console.log('gameStart : ', msg);
});

unityInstance.sendMessage('DiscordWebhooks', 'Test', JSON.stringify({ message: 'Hello World' }));


</script>

<template>
    <VueUnity :unity="unityInstance" width="1280" height="720" />
</template>
