import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModal";
import { sendEmail } from "@/helpers/mailer";

// ensure DB connection
connect();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    // lookup user but do not reveal existence
    const user = await User.findOne({ email });
    if (user) {
      // mailer will hash token & set expiry
      await sendEmail({ email, emailType: "RESET", userId: user._id });
    }

    return NextResponse.json({ success: true, message: "If that email is registered, you’ll receive a reset link" });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ success: false, error: "Unable to process request" }, { status: 500 });
  }
}