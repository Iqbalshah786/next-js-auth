import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModal";
import bcrypt from "bcryptjs";



connect();

export async function POST(request: NextRequest) {
  try {
    // parse and validate input
    const { username, email, password } = (await request.json()) as {
      username: string;
      email: string;
      password: string;
    };
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, error: "All fields (username, email, password) are required" },
        { status: 400 }
      );
    }
    // check if username is already taken
    const existingUsername = await User.find({ username }).lean();
    if (existingUsername.length > 0) {
      return NextResponse.json(
        { success: false, error: "Username already taken. Please choose another." },
        { status: 409 }
      );
    }

    // check for existing user
    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 409 }
      );
    }

    // hash and create
    const hashed = await bcrypt.hash(password, 10);
    const created = await User.create({ username, email, password: hashed });

    // prepare response payload
    const userPayload = {
      id: created._id,
      username: created.username,
      email: created.email,
      role: created.role,
      isVarified: created.isVarified,
      createdAt: created.createdAt,
    };

    return NextResponse.json(
      { success: true, message: "Signup successfully", user: userPayload },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}