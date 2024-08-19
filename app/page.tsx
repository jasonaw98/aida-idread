"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { TextAnimate } from "@/components/ui/text-animate";
import { useState } from "react";

export default function Home() {
  type Chats = {
    userText: string;
    botText: string;
  };

  const [chats, setChats] = useState<Chats[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      const currentInputText = inputText;
      setInputText("");
      setIsLoading(true);
      setChats([...chats, { userText: inputText, botText: "" }]);
      // setChats((prevChats) => [
      //   ...prevChats,
      //   { userText: currentInputText, botText: "" },
      // ]);

      try {
        const response = await fetch(`/api`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: currentInputText }),
        });

        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }

        let x = await response.json();

        // console.log("This is the response", x.message);
        setChats((prevChats) =>
          prevChats.map((chat, index) =>
            index === prevChats.length - 1
              ? { ...chat, botText: x.message }
              : chat
          )
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Stop loading
      }
      // console.log("This is chats", chats);
    }
  };

  return (
    <main className="flex h-full flex-col items-center justify-between px-4">
       {chats.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="text-3xl text-white mb-4">
            <TextAnimate text="Welcome to AIDA" type="popIn" className="text-white"/>
            </div>
          <div className="text-2xl text-white mb-8 hidden md:block">
          {/* Digital Assistant for Government Query */}
          <TextAnimate text="Digital Assistant for Government Query" type="popIn" className="text-white"/>
          </div>
          <p className="text-lg text-gray-300">
            Ask me anything, I'm here to help you!
          </p>
        </div>
      ) : (
      <ScrollArea className="h-[70vh] md:h-[78vh] w-full rounded-md p-2">
        {chats.map((chat, index) => (
          <div key={index} className="text-white">
            {/* Render the user text aligned right */}
            <div className="w-full p-2 flex justify-end">
              <div className="w-fit py-4 px-4 rounded-3xl text-white max-w-3xl bg-blue-600">
                {chat.userText}
              </div>
            </div>
            {/* Render the bot text aligned left if it exists */}
            {chat.botText && (
              <div className="w-full p-2 flex justify-start">
                <div className="w-fit py-4 px-4 rounded-3xl text-white max-w-3xl bg-green-600">
                  {chat.botText}
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="w-full p-2 flex justify-start">
            <div className="w-fit py-4 px-4 rounded-3xl text-white max-w-3xl bg-green-600">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-gray-300" />
                <Skeleton className="h-4 w-[200px] bg-gray-300" />
              </div>
              {/* <span>Bot is typing...</span> */}
            </div>
          </div>
        )}
      </ScrollArea>
      )}

      <div className="py-3 w-full flex justify-center max-h-20 text-white">
        <form
          className="bg-gray-800 rounded-full max-w-lg w-full px-3 flex items-center py-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="How to renew passport"
            className="bg-transparent w-full border-neutral-400 rounded-full px-4 py-2 outline-none text-white"
          />
          <button
            type="submit"
            className="text-white bg-blue-600 rounded-2xl py-1 px-3 hover:bg-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-7 h-7 fill-white"
            >
              <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
            </svg>
          </button>
        </form>
      </div>
    </main>
  );
}
