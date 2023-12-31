import { OpenAIStream, OpenAIStreamPayload } from "@/lib/openAIStream";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  const user = await currentUser();
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
