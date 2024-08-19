"use client";
import { insertDb } from "@/app/login/actions";
import { useState } from "react";

export default function ChatBox({email, setIsLoading}: {email: string, setIsLoading: (loading: boolean) => void}) {

  const [inputText, setInputText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.trim() === "") return;
    if (inputText.trim() !== "") {
      setInputText("");
    }

    setIsLoading(true); 

    const formData = new FormData(e.currentTarget);
    try {
      await insertDb(formData);
      setInputText("");
    } catch (error) {
      console.error("Error inserting into DB:", error);
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="py-3 w-full flex justify-center max-h-20">
      <div className="bg-gray-800 rounded-full max-w-lg w-full">
        <form className="rounded-full px-3 flex items-center py-2" onSubmit={handleSubmit}>
        <input id="email" name="email" type="email" className="hidden" defaultValue={email}/>
          <input
            name="text"
            type="text"
            required
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="bg-transparent w-full border-neutral-400 rounded-full px-4 py-2 outline-none text-white"
          />
          <button 
          className="text-white bg-blue-600 rounded-2xl py-1 px-3 hover:bg-blue-500"
          type="submit">
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
    </div>
  );
}
