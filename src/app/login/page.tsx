"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // Ensure button is enabled only when all fields have content
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonDisabled(true);
    setLoading(true);
    try {
      // if no internet conncection set toast message accordingly
      if (!navigator.onLine) {
        toast.error("No internet connection. Please try again later.", {
          duration: 1500,
        });
        return;
      }

      const response = await axios.post("/api/users/login", user);
      if (response.status === 200) {
        // show a success toast
        toast.success(response.data?.message || "Login successful!");
        // Login successful, redirect to home or dashboard
        router.push("/profile");
      }
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast.error(error.response?.data?.message || "Something went wrong!", {
        duration: 1500,
      });
    } finally {
      setButtonDisabled(false);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
        {loading ? <h1>Processing</h1> : <h1>Login</h1>}
        <hr />
        <form
          onSubmit={onLogin}
          className="flex flex-col items-center justify-center w-max-w-md mx-auto"
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            type="submit"
            className={`${
              buttonDisabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            } bg-blue-500 hover:bg-blue-600  text-white rounded-md p-2 mb-4 w-full `}
            disabled={buttonDisabled}
          >
            Login
          </button>
          <div>
            Create account{" "}
            <Link href="/signup" className="text-gray-500 hover:underline">
              Signup here
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
