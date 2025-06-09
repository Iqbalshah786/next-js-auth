"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = React.useState<any>("nothing");

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      // Redirect to login page after logout
      router.push("/login");
    } catch (error: any) {
      console.log("Error logging out:", error);
      toast.error(
        error.response?.data?.error || "Something went wrong while logging out!"
      );
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log("User Details:", res.data?.user?._id);
    setData(res.data?.user?._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="rounded bg-green-500 p-4 text-white mt-4">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={onLogout}
        className="bg-blue-500 hover:cursor-pointer hover:bg-blue-600 mt-4 text-white rounded-md p-2 mb-4"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-500 hover:cursor-pointer hover:bg-green-600 mt-4 text-white rounded-md p-2 mb-4"
      >
        Get User Details
      </button>
    </div>
  );
}
