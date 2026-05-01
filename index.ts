import { ChannelType, Client, Events, GatewayIntentBits } from "discord.js";

const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
    ]
});

client.on(Events.ClientReady, () => {
    console.log("Ready and listening...");
});

const BASE_TWITTER_URL = "https://x.com/";
const BASE_INSTAGRAM_URL = "https://www.instagram.com/reel/";

client.on(Events.MessageCreate, async (msg) => {
    if (!msg.content.includes(BASE_TWITTER_URL) && !msg.content.includes(BASE_INSTAGRAM_URL)) {
        return;
    }
    if (!msg.deletable) {
        return;
    }
    if (msg.channel.type !== ChannelType.GuildText) {
        return;
    }

    const tempWebhook = await msg.channel.createWebhook({
        name: msg.author.displayName + " [Link Fixed]",
        avatar: msg.author.avatarURL()
    });

    const fixedMessage = msg.content
        .replaceAll(BASE_TWITTER_URL, "https://fixupx.com/")
        .replaceAll(BASE_INSTAGRAM_URL, "https://kkinstagram.com/reel/");
    await tempWebhook.send({
        content: fixedMessage
    });
    await tempWebhook.delete();
    await msg.delete();
});

client.login(process.env.DISCORD_BOT_TOKEN);