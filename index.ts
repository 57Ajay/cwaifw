export { default } from "./src/index";

import { cli, ServerOptions } from "@livekit/agents";
import { fileURLToPath } from "node:url";

cli.runApp(new ServerOptions({
    agent: fileURLToPath(import.meta.url),
    loadThreshold: 0.95,
    numIdleProcesses: 1,
    maxRetry: 3,
    production: true,
    shutdownProcessTimeout: 1
}));
