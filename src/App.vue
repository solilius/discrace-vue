<script setup>
import UnityWebGL from 'unity-webgl';
import VueUnity from 'unity-webgl/vue';

if (window.location.hostname.includes("discordsays.com")) {
    const originalFetch = window.fetch;
    window.fetch = (input, init) => {
        const url = typeof input === "string" ? input : input.url;
        if (url.includes("WebGL.")) {
            return originalFetch(".proxy/" + url, init); // Proxy everything else
        }
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

unityInstance.on('device', () => {
    console.log('Unity WebGL device ready');
});
</script>

<template>
  <VueUnity :unity="unityInstance" width="1280" height="720"/>
</template>
