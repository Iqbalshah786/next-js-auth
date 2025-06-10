"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/users/forgotpassword", { email });
      toast.success(
        res.data.message ||
          "If that email is registered, you’ll receive a reset link."
      );
      setEmail("");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-4">Forgot Password</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-sm gap-4"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 rounded-md p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
