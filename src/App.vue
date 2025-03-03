<script setup>
import UnityWebGL from 'unity-webgl';
import VueUnity from 'unity-webgl/vue';

if (window.location.hostname.includes("discordsays.com")) {
    const originalFetch = window.fetch;
    window.fetch = (input, init) => {
        const url = typeof input === "string" ? input : input.url;
        if (url.includes("StreamingAssets")) {
            return originalFetch(".proxy/" + url, init); // Proxy everything else
        }
    };
}

// Initialize Unity instance
const unityInstance = new UnityWebGL({
    loaderUrl: '/.proxy/Build/WebGL.loader.js',
    dataUrl: '/.proxy/Build/WebGL.data.gz',
    frameworkUrl: '/.proxy/Build/WebGL.framework.js.gz',
    codeUrl: '/.proxy/Build/WebGL.wasm.gz',
});

unityInstance.on('device', () => {
    console.log('Unity WebGL device ready');
});
</script>

<template>
  <VueUnity :unity="unityInstance" width="1280" height="720"/>
</template>
