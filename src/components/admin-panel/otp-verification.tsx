import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface OTPVerificationPageProps {
  code: string; // The OTP code entered by the user
  setCode: (code: string) => void; // Function to update the OTP code
  otpLength?: number; // Optional number of OTP digits (default is 6)
  handleVerify: (e: React.FormEvent) => Promise<React.JSX.Element | undefined>; // Updated to support async actions
}

const OTPVerificationPage = ({
  code,
  setCode,
  otpLength = 6,
  handleVerify
}: OTPVerificationPageProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state
    try {
      await handleVerify(e); // Execute the provided verification function
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <form
      className="min-h-screen flex justify-center items-center  overflow-hidden mx-2 sm:mx-0"
      onSubmit={onSubmit}
    >
        <Image
        src="/Register-bg.svg"
        alt="blur"
        width={200}
        height={200}
        className="object-cover left-0 top-0 h-screen w-full absolute z-0"
      />
      <Card className="w-full max-w-md sm:px-10 py-8 rounded-3xl shadow-lg bg-white z-10">
        <CardHeader className="text-center flex flex-col gap-8">
          <div className="bg-[#233ED91A] w-fit mx-auto p-3 rounded-full">
            <Image
              src={"/brand.svg"}
              alt="UnifiedHr Logo"
              width={48}
              height={48}
              className="text-[#233ED91A]"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold text-[#374151] leading-7">
              OTP Verification
            </CardTitle>
            <p className="text-[#73737F] text-sm mt-2 leading-5">
              Enter the OTP sent to your email to verify your account.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center flex-col gap-4">
            <InputOTP
              value={code}
              onChange={setCode}
              maxLength={otpLength}
              className="text-center"
            >
              <InputOTPGroup>
                {Array.from({ length: otpLength }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="mr-2 sm:mr-3 h-12 w-12"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="text-center">
            <span className="text-sm text-[#6B707B]">
              Didn&apos;t receive an email?{" "}
              <a
                href="#"
                className="text-[#011F4B] hover:underline font-semibold"
              >
                Resend OTP
              </a>
            </span>
          </div>
          <Button
            className="w-full text-[16px] py-3 leading-5 bg-[#4758BB] text-white hover:bg-blue-900 flex items-center justify-center"
            type="submit"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Please wait...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default OTPVerificationPage;
