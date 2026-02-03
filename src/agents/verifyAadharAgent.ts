import { voice } from "@livekit/agents";
import { sendAadharOtpTool, verifyAadharOtpTool } from "../tools/verify_aadhar";
import { verifyAadharPrompt } from "../prompts/verifyAadhar";

export class VerifyAadharAgent extends voice.Agent {
    constructor() {
        super({
            instructions: verifyAadharPrompt(),
            tools: { sendAadharOtpTool, verifyAadharOtpTool },
        });
    }

    override async onEnter() {
        this.session.generateReply();
    }
}
