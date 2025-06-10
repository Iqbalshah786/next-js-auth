"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // extract token from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const t = urlParams.get("token");
    if (t) setToken(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirm) {
      return toast.error("Please fill out all fields");
    }
    if (password !== confirm) {
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      toast.success(res.data.message || "Password reset successful");
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-2xl mb-6">Reset Password</h1>
      {!token ? (
        <p className="text-red-500">Invalid or missing reset token.</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-sm gap-4"
        >
          <input
            type="password"
            placeholder="New password"
            className="border border-gray-300 rounded-md p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="border border-gray-300 rounded-md p-2"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}
