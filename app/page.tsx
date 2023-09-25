"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Image src={"/logo.png"} alt={""} height={266} width={266} />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-12">
        Translate your documents
      </h1>
      <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 pt-5">
        Just upload your documents and they will automatically get translated
      </h2>
      <Button
        onClick={() => {
          router.push("/translate");
        }}
        className="mt-12 h-12 w-42"
      >
        Get Started
      </Button>
    </main>
  );
}
