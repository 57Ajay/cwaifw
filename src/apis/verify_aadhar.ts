import { z } from "zod";

const ReturnAadharOTP = z.object({
    success: z.boolean(),
    data: z.string().min(4).nullable(),
});

const ReturnVerifyAadharOtp = z.object({
    success: z.boolean(),
});

export type SendAadharOTP = z.infer<typeof ReturnAadharOTP>;
export type VerifyAadharOtp = z.infer<typeof ReturnVerifyAadharOtp>;

export const sendAadharOtpApi = async ({ aadharNumber }: { aadharNumber: string }): Promise<SendAadharOTP> => {
    if (!aadharNumber) {
        return {
            success: false,
            data: null
        }
    }
    return {
        success: true,
        data: "6969",
    };
}


export const verifyAadharOtpApi = async ({ otp }: { otp: string }): Promise<VerifyAadharOtp> => {
    if (!otp) {
        return {
            success: false
        }
    }
    return {
        success: true
    }
}


