"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthError() {
  // const searchParams = useSearchParams();
  // const error = searchParams.get("error");
  // const errorDescription = searchParams.get("error_description");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          {/* <p className="mt-2 text-center text-sm text-red-600">
            Error Type: {error}
          </p>
          {errorDescription && (
            <p className="mt-2 text-center text-sm text-gray-600">
              {errorDescription}
            </p>
          )} */}
        </div>
        <div className="mt-6">
          <Link href="/auth/signin">
            <Button className="w-full">
              Return to Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 