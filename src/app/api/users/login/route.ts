import { connect } from "@/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("Login request body:", reqBody);

    // Check if user exists
    // include password field for verification
    const existingUser = await User.findOne({ email }).select('+password');
    if (!existingUser) {
      return NextResponse.json(
        { message: "You need to sign up first" },
        { status: 404 }
      );
    }

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, existingUser.password!);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
    
    // build response payload without sensitive fields
    const userPayload = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
      isVarified: existingUser.isVarified,
      createdAt: existingUser.createdAt,
    };

    //create token data
    const tokenData ={
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
    }
    // Set token in cookies
    const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{
        expiresIn: "1d"
    })

    const response = NextResponse.json(
      { success: true, message: "Login successful", user: userPayload },
      { status: 200 }
    );
    response.cookies.set("token",token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })
    return response;
  } catch (error:any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}