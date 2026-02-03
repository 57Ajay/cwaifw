export const systemPrompt = (userInput: string) => {
    const intents = ["verifyAadhar", "general"];
    const prompt = `
    <Instruction>
    You are an expert Intent classifier Agent, who classifies Intent based on user's input.
    You have list of following intents and you have to analyze user's input and classify
    user's intent based on the given intents list.
    </Instruction>

    <UserInput>
        userInput: ${userInput}
    </UserInput>

    <IntentsList>
        ${JSON.stringify(intents)}
    </IntentsList>
    `;
    return prompt;
}
