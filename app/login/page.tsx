"use client";
import { useState } from "react";
import { signInWithEmail } from "./actions";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  // Email validation function
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsValidEmail(validateEmail(emailValue));
  };

  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center">
      <form className="flex flex-col justify-center items-center gap-4">
        <p className="text-white text-xl">Enter your email</p>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-80 px-3 py-2 rounded-xl outline-none"
          value={email}
          onChange={handleEmailChange}
        />
        <button
          formAction={signInWithEmail}
          className={cn("text-white bg-blue-600 flex w-fit px-3 py-2 rounded-xl ",
            isValidEmail ? "cursor-pointer hover:bg-blue-500" : "cursor-not-allowed bg-blue-900 text-gray-400",
          )}
          onClick={() => setSent(true)}
          disabled={!isValidEmail} // Disable button if email is invalid
        >
          {sent ? "Link Sent!" : "Send Link"}
        </button>
      </form>
      {sent && <p className="text-white text-2xl mt-4">Check Your Email!</p>}
    </div>
  );
}
