<script setup>
import UnityWebGL from 'unity-webgl';
import VueUnity from 'unity-webgl/vue';

const unityInstance = new UnityWebGL({
  loaderUrl: 'Build/WebGL.loader.js',
  dataUrl: 'Build/WebGL.data.gz',
  frameworkUrl: 'Build/WebGL.framework.js.gz',
  codeUrl: 'Build/WebGL.wasm.gz',
});

unityInstance.on('device', () => {
  console.log('Unity WebGL device ready');
});
console.log("tesxy");
</script>

<template>
  <VueUnity :unity="unityInstance" width="1280" heigth="720"/>
</template>
