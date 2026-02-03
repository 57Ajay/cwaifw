export { default } from "./src/index";

import { cli, ServerOptions } from "@livekit/agents";
import { fileURLToPath } from "node:url";

cli.runApp(new ServerOptions({ agent: fileURLToPath(import.meta.url), agentName: JSON.stringify(Date.now()) }));
