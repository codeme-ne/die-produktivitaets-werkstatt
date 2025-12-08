import axios, { type AxiosError } from "axios";
import { logInfo, logError } from "@/libs/logger";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AxiosErrorResponse {
  status?: number;
  data?: unknown;
}

// Use this if you want to make a call to OpenAI GPT-4 for instance. userId is used to identify the user on openAI side.
export const sendOpenAi = async (
  messages: ChatMessage[],
  userId: number,
  max = 100,
  temp = 1,
): Promise<string | null> => {
  const url = "https://api.openai.com/v1/chat/completions";

  logInfo("Ask GPT", {
    messages: messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`),
  });

  const body = JSON.stringify({
    model: "gpt-4",
    messages,
    max_tokens: max,
    temperature: temp,
    user: userId,
  });

  const options = {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(url, body, options);

    const answer = res.data.choices[0].message.content as string;
    const usage = res?.data?.usage;

    logInfo("GPT response", {
      answer,
      tokensTotal: usage?.total_tokens,
      tokensPrompt: usage?.prompt_tokens,
      tokensResponse: usage?.completion_tokens,
    });

    return answer;
  } catch (e) {
    const axiosErr = e as AxiosError<AxiosErrorResponse>;
    logError("GPT Error", {
      status: axiosErr?.response?.status,
      data: axiosErr?.response?.data,
    });
    return null;
  }
};
