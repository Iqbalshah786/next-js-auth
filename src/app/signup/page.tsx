"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Ensure button is enabled only when all fields have content
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonDisabled(true);
    try {
      const response = await axios.post("/api/users/signup", user);

      if (response.status === 201) {
        // User created successfully, redirect to login
        toast.success("Successfully signed up!");

        router.push("/login");
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error(error.response?.data?.error || "Something went wrong!", {
        duration: 1500,
      });
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
        <h1>SignUp</h1>
        <form
          onSubmit={onSignup}
          className="flex flex-col items-center justify-center w-max-w-md mx-auto"
        >
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
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
            SignUp
          </button>
          <Link href={"/login"} className="text-white-500 hover:underline">
            Visit login page
          </Link>
        </form>
      </div>
    </>
  );
}
