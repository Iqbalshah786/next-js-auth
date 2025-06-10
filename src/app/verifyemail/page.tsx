"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Mail, Loader2 } from "lucide-react";

export default function VerifyEmail() {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Start with loading true
  const [initialized, setInitialized] = useState<boolean>(false);

  const verifyEmail = async (tokenToVerify: string) => {
    if (!tokenToVerify) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/users/verifyemail", {
        token: tokenToVerify,
      });
      console.log("Response from verify email:", res);
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Add a small delay to ensure URL is fully loaded
    const initializeVerification = async () => {
      // Wait a brief moment to ensure URL parameters are available
      await new Promise((resolve) => setTimeout(resolve, 100));

      const urlToken = window.location.search.split("=")[1];
      if (urlToken) {
        setToken(urlToken);
        await verifyEmail(urlToken);
      } else {
        setError(true);
        setLoading(false);
      }
      setInitialized(true);
    };

    initializeVerification();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-black mb-4">
              Verifying Your Email
            </h1>
            <p className="text-gray-700">
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-black mb-4">
              Email Verified Successfully!
            </h1>
            <p className="text-gray-700 mb-8">
              Your email has been verified. You can now login to your account.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              Continue to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-black mb-4">
              Verification Failed
            </h1>
            <p className="text-gray-700 mb-8">
              We couldn't verify your email. The link may be invalid or expired.
            </p>
            <div className="space-y-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                Sign Up Again
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:bg-gray-50"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              No Verification Token
            </h1>
            <p className="text-gray-600 mb-8">
              No verification token was found. Please check your email for the
              verification link.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
