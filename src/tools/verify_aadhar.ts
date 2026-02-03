import { llm } from "@livekit/agents";
import { z } from "zod";
import { sendAadharOtpApi, verifyAadharOtpApi, type SendAadharOTP, type VerifyAadharOtp } from "../apis/verify_aadhar";

export const sendAadharOtpTool = llm.tool({
    description: "This tool is used for sending OTP on Registered mobile no. in AADHAR",
    parameters: z.object({
        aadharNumber: z.string().min(12, { message: "aadhar must be of 12 digits." }).max(12, { message: "You must be of 12 digits." }),
    }),

    execute: async ({ aadharNumber }, { ctx }): Promise<SendAadharOTP> => {
        const res = await sendAadharOtpApi({ aadharNumber });
        return res;
    },
});

export const verifyAadharOtpTool = llm.tool({
    description: "This Tool verifies AADHAR OTP after sendAadharOtpTool is called",
    parameters: z.object({
        otp: z.string().min(4, { message: "OTP must be atleast 4 digits long." }),
    }),

    execute: async ({ otp }, { ctx }): Promise<VerifyAadharOtp> => {
        const res = await verifyAadharOtpApi({ otp });
        return res;
    },
});
