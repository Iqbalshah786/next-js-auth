"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { z } from "zod";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate form and enable/disable button
  useEffect(() => {
    const result = loginSchema.safeParse(user);
    if (result.success) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // Validate individual fields when touched
  const validateField = (field: string, value: string) => {
    const fieldSchema =
      field === "email"
        ? z.string().email("Please enter a valid email")
        : z.string().min(1, "Password is required");

    const result = fieldSchema.safeParse(value);
    if (result.success) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: result.error.errors[0].message,
      }));
    }
  };
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Welcome </h1>
          <p className="text-gray-700">Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={onLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                    touched.email && errors.email
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-indigo-500"
                  }`}
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                    if (touched.email) {
                      validateField("email", e.target.value);
                    }
                  }}
                  onBlur={() => {
                    setTouched((prev) => ({ ...prev, email: true }));
                    validateField("email", user.email);
                  }}
                />
              </div>
              {touched.email && errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                    touched.password && errors.password
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-indigo-500"
                  }`}
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                    if (touched.password) {
                      validateField("password", e.target.value);
                    }
                  }}
                  onBlur={() => {
                    setTouched((prev) => ({ ...prev, password: true }));
                    validateField("password", user.password);
                  }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 hover:cursor-pointer" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 hover:cursor-pointer" />
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                href="/forgotpassword"
                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={buttonDisabled || loading}
              className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white font-medium transition-all duration-200 ${
                buttonDisabled || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 hover:cursor-pointer"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <LogIn className="ml-2 h-5 w-5" />}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-black">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
