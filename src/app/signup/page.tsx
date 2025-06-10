"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { z } from "zod";

// Validation schema
const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

export default function SignUpPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Validate form and enable/disable button
  useEffect(() => {
    const result = signupSchema.safeParse(user);
    if (result.success) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // Validate individual fields when touched
  const validateField = (field: string, value: string) => {
    let fieldSchema;
    switch (field) {
      case "username":
        fieldSchema = z
          .string()
          .min(3, "Username must be at least 3 characters");
        break;
      case "email":
        fieldSchema = z.string().email("Please enter a valid email address");
        break;
      case "password":
        fieldSchema = z
          .string()
          .min(8, "Password must be at least 8 characters")
          .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
          .regex(/[a-z]/, "Password must contain at least one lowercase letter")
          .regex(/\d/, "Password must contain at least one number")
          .regex(
            /[@$!%*?&]/,
            "Password must contain at least one special character"
          );
        break;
      default:
        return;
    }

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

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup successful", response.data);
      toast.success(
        "Signup successful! Please check your email to verify your account."
      );
      setUser({ username: "", email: "", password: "" });
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Create Account</h1>
          <p className="text-gray-700">Join us today and get started</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={onSignup} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-black mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    touched.username && errors.username
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  value={user.username}
                  onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
                    if (touched.username) {
                      validateField("username", e.target.value);
                    }
                  }}
                  onBlur={() => {
                    setTouched((prev) => ({ ...prev, username: true }));
                    validateField("username", user.username);
                  }}
                />
              </div>
              {touched.username && errors.username && (
                <p className="mt-2 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

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
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    touched.email && errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
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
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
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
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    touched.password && errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
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
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={buttonDisabled}
              className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center ${
                buttonDisabled ? "cursor-not-allowed" : "hover:cursor-pointer"
              }`}
            >
              <div className="flex items-center">
                Create Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-black">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
