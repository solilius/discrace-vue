import { DiscordSDK } from "@discord/embedded-app-sdk";

const CLIENT_ID = "1344758737231020245";

export async function initializeSdk(): Promise<DiscordSDK> {
    if (typeof CLIENT_ID !== "string") {
        throw new Error("Must specify 'CLIENT_ID'");
    }

    const discordSdk = new DiscordSDK(CLIENT_ID);
    await discordSdk.ready();

    const { code } = await discordSdk.commands.authorize({
        client_id: CLIENT_ID,
        response_type: "code",
        state: "",
        prompt: "none",
        scope: ["identify", "rpc.activities.write", "rpc.voice.read"],
    });

    console.log("discordSdk code", code);

    // const response = await fetch('/api/token', {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ code }),
    // });
    // const { access_token } = await response.json();

    // await discordSdk.commands.authenticate({ access_token });

    return discordSdk;
}
