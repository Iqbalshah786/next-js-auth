import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextResponse,NextRequest } from "next/server";

import User from "@/models/userModal";
import { connect } from "@/dbConfig";
connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch user data excluding sensitive fields
    const user = await User.findById(userId).select("-password -__v");
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true ,
        user ,
       status: 200
      },
    );
  } catch (error:any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}