import { NextResponse } from "next/server";


export async function GET() {
  try {
    // Clear the token cookie
    const response = NextResponse.json(
      { success: true, message: "Logout successful" },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set expiration to the past to clear the cookie
      secure: process.env.NODE_ENV === "production", // Use secure flag in production
      sameSite:"lax", // Use lax sameSite policy for better compatibility
    });
    return response;
  } catch (error:any) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
