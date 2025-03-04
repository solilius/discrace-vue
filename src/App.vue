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
                return originalFetch(patchUrl(input), init);
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

unityInstance.on('device', () => {
    console.log('Unity WebGL device ready');
});



function patchUrl(url, prefix = ProxyPrefix) {
    const ProxyHosts = ['discordsays.com', 'discordsez.com']

	const mappedPrefixes = globalThis['@robojs/patch']?.mappings ?? []
	const base = typeof url === 'string' ? window.location.origin : undefined
	const newUrl = new URL(url instanceof Request ? url.url : String(url), base)

	const isProxied =
		ProxyHosts.some((host) => newUrl.hostname.endsWith(host)) &&
		!mappedPrefixes.find((prefix) => newUrl.pathname.startsWith(prefix))

	if (isProxied && !newUrl.pathname.startsWith(prefix)) {
		newUrl.pathname = prefix + newUrl.pathname
	}

	if (url instanceof Request) {
		return new Request(newUrl, {
			method: url.method,
			headers: url.headers,
			body: url.bodyUsed ? null : url.body,
			mode: url.mode,
			credentials: url.credentials,
			// @ts-expect-error - `duplex` is part of the Fetch spec
			duplex: url.body instanceof ReadableStream ? 'half' : undefined,
			cache: url.cache,
			redirect: url.redirect,
			referrer: url.referrer,
			referrerPolicy: url.referrerPolicy,
			integrity: url.integrity,
			keepalive: url.keepalive,
			signal: url.signal
		})
	} else {
		return newUrl
	}
}
</script>

<template>
    <VueUnity :unity="unityInstance" width="1280" height="720" />
</template>
