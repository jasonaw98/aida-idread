"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signInWithEmail(formData: FormData) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOtp({
    email: formData.get("email") as string,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
      emailRedirectTo: "/private",
    },
  });
  console.log("Email sent", data, error);
}

export async function insertDb(formData: FormData) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("idreadchat")
    .insert([
      {
        email: formData.get("email") as string,
        userMessage: formData.get("text") as string,
      },
    ])
    .select();

  try {
    var formdata = new FormData();
    formdata.append("apikey", process.env.NEXT_PUBLIC_ZYGY_API_KEY as string);
    formdata.append(
      "serviceAccount",
      process.env.NEXT_PUBLIC_ZYGY_SERVICE_ACCOUNT as string
    );
    formdata.append("keyword", formData.get("text") as string);
    const zygyResponse = await fetch(
      "https://knowledge.zygy.com/user/user-api/zygychatbotapi/1.0",
      {
        method: "POST",
        body: formdata,
      }
    );

    const responseData = await zygyResponse.json();

    // console.log("Zygy Response", responseData);

    const { data, error } = await supabase
      .from("idreadchat")
      .insert([
        {
          email: formData.get("email") as string,
          repliedMessage: responseData,
        },
      ])
      .select();
  } catch (error) {
    console.log(error);
  }
}
