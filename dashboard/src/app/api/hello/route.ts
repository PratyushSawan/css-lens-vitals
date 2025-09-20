import { NextResponse } from "next/server";

export async function GET(request: any) {
  console.log(request);
  try {
    // const reqBody = await request.json();
    // const { url: targetUrl } = reqBody;
    console.log("reqBody");
    return NextResponse.json({
      message: "Hello from Next.js API!",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
