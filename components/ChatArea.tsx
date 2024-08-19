"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";
import ChatBox from "./ChatBox";
import { Skeleton } from "./ui/skeleton";

type Database = {
  created_at: string;
  userMessage: string;
  repliedMessage?: string | null;
  email: string | null;
  id: number;
};

export default function ChatArea({ serverPosts, email }: { serverPosts: Database[], email: string }) {
  const supabase = createClient();

  const [texts, setTexts] = useState(serverPosts);
  const [isLoading, setIsLoading] = useState(false);

  // console.log("Text", ...texts);
  useEffect(() => {
    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "idreadchat" },
        (payload) => {
          // console.log("Change received!", payload);
          setTexts([...texts, payload.new as Database]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channels);
    };
  }, [supabase, []]);

  return (
    <div className="w-full px-4">
      <ScrollArea className="h-[78vh] w-full rounded-md p-3">
        {texts?.map((text, index) => (
          <ChatBubble
            key={index}
            chatText={text.userMessage}
            repliedText={text.repliedMessage ?? ""}
          />
        ))}
         {isLoading && (
          <div className="w-full p-2 flex justify-start">
            <div className="w-fit py-4 px-4 rounded-3xl text-white max-w-3xl bg-green-600">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-gray-300" />
                <Skeleton className="h-4 w-[200px] bg-gray-300" />
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
      <ChatBox email={email} setIsLoading={setIsLoading}/>
    </div>
  );
}

const ChatBubble = ({
  chatText,
  repliedText,
}: {
  chatText: string;
  repliedText: string;
}) => (
  <div
    className={cn(
      "w-full p-2 flex",
      repliedText ? "justify-start" : "justify-end"
    )}
  >
    <div
      className={cn(
        "w-fit py-4 px-4 rounded-3xl text-white max-w-3xl text-wrap flex ",
        repliedText ? "bg-green-600" : "bg-blue-600"
      )}
    >
      {repliedText ? repliedText : chatText}
    </div>
  </div>
);
