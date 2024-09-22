import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message } = await request.json();
  // console.log("message", message);
  try {
    var formdata = new FormData();
    formdata.append("apikey", process.env.NEXT_ZYGY_API_KEY as string);
    formdata.append(
      "serviceAccount",
      process.env.NEXT_ZYGY_SERVICE_ACCOUNT as string
    );
    formdata.append("keyword", message as string);
    const zygyResponse = await fetch(
      process.env.NEXT_ZYGY_URL as string,
      {
        method: "POST",
        body: formdata,
      }
    );

    const responseData = await zygyResponse.json();
    // console.log("This is the response", responseData);

    return NextResponse.json({
      respond: responseData,
      message: responseData.answer,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
