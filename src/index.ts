import { type JobContext, type JobProcess, defineAgent, llm, voice } from "@livekit/agents";
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
    entry: async (ctx: JobContext) => {
        try {
            console.log("Job received, connecting...");
            await ctx.connect();
            console.log("Connected, waiting for participant...");
            await ctx.waitForParticipant();
            console.log("Participant joined, starting session...");

            const session = new voice.AgentSession({
                llm: new google.LLM({
                    model: "gemini-2.5-flash",
                    vertexai: true,
                    project: "learned-catcher-481711-g0",
                    location: "asia-south1",
                }),
            });

            await session.start({
                agent: new TriageAgent(),
                room: ctx.room,
                inputOptions: { audioEnabled: false },
                outputOptions: { audioEnabled: false },
            });
            console.log("Session started successfully");
        } catch (err) {
            console.error("Error in entry:", err);
        }
    },
    // entry: async (ctx: JobContext) => {
    //     await ctx.connect();
    //     await ctx.waitForParticipant();
    //
    //     const session = new voice.AgentSession({
    //         llm: new google.LLM({
    //             model: "gemini-2.5-flash",
    //             vertexai: true,
    //             project: "learned-catcher-481711-g0",
    //             location: "asia-south1"
    //         }),
    //     });
    //
    //     await session.start({
    //         agent: new TriageAgent(),
    //         room: ctx.room,
    //         inputOptions: {
    //             audioEnabled: false,
    //         },
    //         outputOptions: {
    //             audioEnabled: false,
    //         }
    //     });
    // },
});
