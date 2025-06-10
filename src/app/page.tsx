"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Shield,
  Lock,
  Mail,
  UserCheck,
  RefreshCw,
  LogIn,
  LogOut,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/users/me");
        setIsLoggedIn(response.ok);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);
  const features = [
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "User Registration",
      description:
        "Secure signup with email verification and password validation",
    },
    {
      icon: <LogIn className="w-6 h-6" />,
      title: "Login System",
      description:
        "JWT-based authentication with HTTP-only cookies for security",
    },
    {
      icon: <LogOut className="w-6 h-6" />,
      title: "Logout Functionality",
      description: "Secure session termination and cookie cleanup",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Verification",
      description: "Account activation through secure email verification links",
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Password Reset",
      description:
        "Forgot password functionality with secure token-based reset",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Route Protection",
      description:
        "Middleware-based route protection for public and private pages",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Header */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Lock className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-black">
              NextJs Authentication
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="w-20 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            ) : isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={async () => {
                    await fetch("/api/users/logout");
                    window.location.reload();
                  }}
                  className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors hover:cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors hover:cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-black mb-4">
            Next.js Authentication System
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            A complete, secure authentication solution built with Next.js 15,
            featuring JWT tokens, email verification, password reset, and
            middleware-based route protection.
          </p>
          {loading ? (
            <div className="w-40 h-14 bg-gray-200 rounded-xl animate-pulse mx-auto"></div>
          ) : isLoggedIn ? (
            <Link
              href="/profile"
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 hover:cursor-pointer text-lg"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 hover:cursor-pointer text-lg"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-8">
            Built With Modern Technologies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">Next</span>
              </div>
              <h4 className="font-semibold text-black">Next.js 15</h4>
              <p className="text-gray-700 text-sm">React Framework</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">DB</span>
              </div>
              <h4 className="font-semibold text-black">MongoDB</h4>
              <p className="text-gray-700 text-sm">Database</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">JWT</span>
              </div>
              <h4 className="font-semibold text-black">JWT Tokens</h4>
              <p className="text-gray-700 text-sm">Authentication</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">TS</span>
              </div>
              <h4 className="font-semibold text-black">TypeScript</h4>
              <p className="text-gray-700 text-sm">Type Safety</p>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-8">
            Security First Approach
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-800">
                  Password hashing with bcrypt
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-800">
                  HTTP-only cookies for token storage
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-800">Email verification system</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-800">
                  Secure password reset tokens
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-800">
                  Middleware route protection
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-800">Input validation with Zod</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-800">
                  Environment-based configuration
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl shadow-xl p-12">
          <h2 className="text-3xl font-bold text-black mb-4">
            {isLoggedIn ? "Welcome Back!" : "Ready to Get Started?"}
          </h2>
          <p className="text-gray-700 mb-8 max-w-xl mx-auto">
            {isLoggedIn
              ? "You're already logged in! Visit your profile to manage your account or explore the authentication features."
              : "Experience the complete authentication flow with secure login, registration, email verification, and password reset functionality."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {loading ? (
              <div className="flex gap-4 justify-center">
                <div className="w-32 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="w-32 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            ) : isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
                >
                  <UserCheck className="w-5 h-5 mr-2" />
                  Go to Profile
                </Link>
                <button
                  onClick={async () => {
                    await fetch("/api/users/logout");
                    window.location.reload();
                  }}
                  className="inline-flex items-center bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
                >
                  <UserCheck className="w-5 h-5 mr-2" />
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
