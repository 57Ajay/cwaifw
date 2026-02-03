import { AccessToken } from "livekit-server-sdk";

const API_KEY = process.env.LIVEKIT_API_KEY || "lkitkey";
const API_SECRET =
    process.env.LIVEKIT_API_SECRET || "wkejnd$#2!()&kjqwnwdnwe^%##$!l_+";
const LIVEKIT_URL = process.env.LIVEKIT_URL || "ws://localhost:7880";

console.log("API_SECRET", API_SECRET);
console.log("LIVEKIT_URL", LIVEKIT_URL);
console.log("API_KEY", API_KEY);

async function generateToken() {
    const roomName = process.argv[2] || "test-room";
    const participantName = process.argv[3] || "test-user";

    const at = new AccessToken(API_KEY, API_SECRET, {
        identity: participantName,
        ttl: "1h",
    });

    at.addGrant({
        roomJoin: true,
        room: roomName,
        canPublish: true,
        canSubscribe: true,
        canPublishData: true,
    });

    const token = await at.toJwt();

    console.log("=== LiveKit Connection Details ===");
    console.log(`URL:   ${LIVEKIT_URL}`);
    console.log(`Room:  ${roomName}`);
    console.log(`Token: ${token}`);
    console.log("================================");
}

generateToken().catch(console.error);
