import ChatForm from "@/components/chat-form";
import { UserButton } from "@clerk/nextjs";

const TranslatePage = () => {
  return (
    <main className="flex flex-col">
      <div className="flex w-screen justify-end items-start p-4">
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 text-center -mt-16">
        <h1 className="my-4 text-6xl font-bold">Translate</h1>
        <div className="flex flex-col items-center gap-2 font-mono md:flex-row">
          <div className="bg-neuborder-neutral-900 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
            <div className="text-2xl text-neutral-50 dark:text-neutral-900">
              1
            </div>
          </div>
          <p className="font-bold">
            Ask a question.
            <span className="text-neutral-400">(Max. 200 characters)</span>
          </p>
        </div>
        <ChatForm />
      </div>
    </main>
  );
};

export default TranslatePage;
