"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Copy, Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "The text to translate can't be empty.",
  }),
});

const ChatForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>("");

  const onCopy = () => {
    if (!response) return;

    navigator.clipboard.writeText(response);

    toast({
      description: "Text copied to clipboard",
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const prompt = `Q: ${values.prompt} \n\n Translate this text and only answer with the translated text without any additional comment.`;

    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResponse((prev) => prev + chunkValue);
    }
    setLoading(false);
  }

  return (
    <div className="w-screen px-28">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Enter the text you want to translate"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!loading ? (
            <Button type="submit">Translate</Button>
          ) : (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Translating...
            </Button>
          )}
        </form>
      </Form>
      {response && (
        <div
          onClick={() => {
            if (!loading) {
              onCopy();
            }
          }}
          className=" group mt-8 rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100 cursor-pointer"
        >
          {!loading && (
            <Button
              className="opacity-0 group-hover:opacity-100 transition relative top-0 right-0"
              size="icon"
              variant="ghost"
            >
              <Copy className="w-4 h-4" />
            </Button>
          )}
          {response}
        </div>
      )}
    </div>
  );
};

export default ChatForm;
