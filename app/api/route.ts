import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message } = await request.json();
  // console.log("message", message);
  try {
    var formdata = new FormData();
    formdata.append("apikey", process.env.NEXT_PUBLIC_ZYGY_API_KEY as string);
    formdata.append(
      "serviceAccount",
      process.env.NEXT_PUBLIC_ZYGY_SERVICE_ACCOUNT as string
    );
    formdata.append("keyword", message as string);
    const zygyResponse = await fetch(
      "https://knowledge.zygy.com/user/user-api/zygychatbotapi/1.0",
      {
        method: "POST",
        body: formdata,
      }
    );

    const responseData = await zygyResponse.json();

    return NextResponse.json({
      message: responseData,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: error, status: 500 });
  }
}
