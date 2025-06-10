import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModal";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const { token, password } = (await request.json()) as {
      token: string;
      password: string;
    };

    if (!token || !password) {
      return NextResponse.json(
        { success: false, error: "new password is required" },
        { status: 400 }
      );
    }

    // find users with unexpired reset token, include password for validation
    const user = await User.findOne({
        forgotPasswordToken: token,
        forgotPasswordExpiry: { $gt: Date.now() },
    }).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 400 }
      );
    }
    // prevent reusing the same password
    if (await bcrypt.compare(password, user.password!)) {
      return NextResponse.json(
        { success: false, error: "New password cannot be the same as the old one" },
        { status: 400 }
      );
    }

    // hash and update password
    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();

    return NextResponse.json({ success: true, message: "Password reset successful" });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to reset password" },
      { status: 500 }
    );
  }
}