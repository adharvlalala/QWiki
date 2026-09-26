"use client";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function GoogleSignInButton() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: credentialResponse.credential,
      });

      if (authError) {
        throw authError;
      }

      // Redirect to dashboard after successful login
      router.push("/dashboard/contributor");
      router.refresh(); // Refresh the router to update server components with the new session
    } catch (err: any) {
      console.error("Authentication error:", err);
      setError("Failed to authenticate with Supabase.");
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
    setError("Google login was unsuccessful. Please try again.");
  };

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return (
      <div className="text-[13px] text-red-500 font-mono">
        NEXT_PUBLIC_GOOGLE_CLIENT_ID is missing.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {error && (
        <div
          className="py-3 text-[13px] text-[#000000]"
          style={{
            borderLeft: "2px solid #000000",
            paddingLeft: "16px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {error}
        </div>
      )}
      <GoogleOAuthProvider clientId={clientId}>
        <div className="w-full flex justify-center items-center [&>div]:w-full [&_iframe]:w-full">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            theme="filled_black"
            shape="rectangular"
            size="large"
            text="continue_with"
            width="384"
            logo_alignment="left"
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}
