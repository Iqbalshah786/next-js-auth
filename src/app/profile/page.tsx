"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import {
  User,
  LogOut,
  UserCheck,
  ArrowRight,
  Loader2,
  Home,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState<any>("nothing");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userLoading, setUserLoading] = React.useState<boolean>(false);

  const onLogout = async () => {
    setLoading(true);
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      router.push("/");
    } catch (error: any) {
      console.log("Error logging out:", error);
      toast.error(
        error.response?.data?.error || "Something went wrong while logging out!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    setUserLoading(true);
    try {
      const res = await axios.get("/api/users/me");
      console.log("User Details:", res.data?.user?._id);
      setData(res.data?.user?._id);
      toast.success("User details fetched successfully!");
    } catch (error: any) {
      console.log("Error fetching user details:", error);
      toast.error("Failed to fetch user details");
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex items-center justify-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-black">
                Profile Dashboard
              </h1>
            </div>
            <p className="text-gray-700">
              Manage your account and view your details
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
                User Information
              </h2>
              <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-200">
                {data === "nothing" ? (
                  <p className="text-gray-500 text-center">
                    Click "Get User Details" to fetch your information
                  </p>
                ) : (
                  <Link
                    href={`/profile/${data}`}
                    className="inline-flex items-center justify-between w-full p-3 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-lg transition-all duration-200 group"
                  >
                    <span className="font-mono text-sm text-black truncate">
                      {data}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                  </Link>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={getUserDetails}
                disabled={userLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center hover:cursor-pointer"
              >
                {userLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Fetching Details...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Get User Details
                  </div>
                )}
              </button>

              <button
                onClick={onLogout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center hover:cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Logging Out...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
