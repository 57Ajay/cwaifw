import { type JobContext, type JobProcess, defineAgent, llm, voice } from "@livekit/agents";
import * as silero from "@livekit/agents-plugin-silero";
import * as google from "@livekit/agents-plugin-google";
import { z } from "zod";
import { VerifyAadharAgent } from "./agents/verifyAadharAgent";
import { systemPrompt } from "./prompts/systemPrompt";

class TriageAgent extends voice.Agent {
    constructor() {
        super({
            instructions: systemPrompt(),
            tools: {
                handoffToAadharVerification: llm.tool({
                    description: "Hand off to Aadhar verification agent when user wants to verify their aadhar.",
                    parameters: z.object({}),
                    execute: async () => {
                        return llm.handoff({
                            agent: new VerifyAadharAgent(),
                            returns: "Transferring you to Aadhar verification.",
                        });
                    },
                }),
            },
        });
    }

    override async onEnter() {
        this.session.generateReply({ instructions: "Greet the user and ask how you can help." });
    }
}

export default defineAgent({
    prewarm: async (proc: JobProcess) => {
        proc.userData.vad = await silero.VAD.load();
    },
    entry: async (ctx: JobContext) => {
        await ctx.connect();
        await ctx.waitForParticipant();

        const session = new voice.AgentSession({
            vad: ctx.proc.userData.vad! as silero.VAD,
            llm: new google.LLM({
                model: "gemini-2.0-flash",
                vertexai: true,
            }),
        });

        await session.start({
            agent: new TriageAgent(),
            room: ctx.room,
        });
    },
});
