import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ChatArea from "@/components/ChatArea";

const supabase = createClient();
export default async function PrivatePage() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const { data: idreadchat, error: idreadchatError } = await supabase
    .from("idreadchat")
    .select("*")
    .eq("email", data.user.email);

  return (
    <div>
      <ChatArea serverPosts={idreadchat ?? []} email={data.user.email ?? ""} />
    </div>
  );
}
