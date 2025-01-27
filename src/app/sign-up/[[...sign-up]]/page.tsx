"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Loader2, LockKeyholeIcon, Mail } from "lucide-react";
import Link from "next/link";
import { useSignIn, useSignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import OTPVerificationPage from "@/components/admin-panel/otp-verification";
import { toast } from "react-toastify";
import { OAuthStrategy } from '@clerk/types'

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();



  const handleChange = (e: any) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value
    }));
  };

  const signUpWith = async(strategy: OAuthStrategy) => {
    if(!isLoaded) return null;



    setGoogleLoading(true)
    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sign-in',
        redirectUrlComplete: '/dashboard',
      })
      
    } catch (error) {

      toast.error("Something went wrong!,please try again!");
      router.push("/sign-in")
      
    }
    
  }


 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code"
      });

      setVerifying(true);
      toast.success("OTP has been sent to your email!");
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));

      toast.error(error.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return <p>Loading...</p>;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/dashboard");
        toast.success("User Registered Successful!");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      console.error("Error:", JSON.stringify(err, null, 2));
      toast.error(err.errors[0].message);
    }
  };


  if (verifying) {
    return (
      <OTPVerificationPage
        code={code}
        setCode={setCode}
        handleVerify={handleVerify}
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Blur */}
      <Image
        src="/Register-bg.svg"
        alt="blur"
        width={200}
        height={200}
        className="object-cover left-0 top-0 h-screen w-full absolute -z-10"
      />

      {/* Form Container */}
      <div className="z-50 flex items-center justify-center lg:justify-start lg:pl-20 min-h-screen px-5 animate-slide-left ">
        <div className="w-full max-w-md p-8 ">
          {/* Form Heading */}
          <h1 className="text-3xl font-bold text-gray-800 text-center lg:text-left">
            Sign Up & Get{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-t from-[#4D62E5] to-[#87DDEE]">
              Started
            </span>
          </h1>
          <p className="text-sm text-gray-500 text-center lg:text-left mt-2">
            Join Us & Build a Powerful Brand with AI
          </p>

          {/* Form */}
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-800">
                  <Mail size={18} />
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="pl-10 bg-white border border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-800">
                  <LockKeyholeIcon size={18} />
                </span>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="pl-10 bg-white border border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.remember}
                onCheckedChange={(checked) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    remember: checked === true // Ensure `checked` is a boolean
                  }))
                }
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Please wait...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>

            {/* Divider */}
            <div className="relative mt-4">
              <Separator className="bg-black" text="or continue with" />
            </div>

            {/* Google Login */}
            <Button
              variant="outline"
              className="w-full mt-4 flex justify-center items-center"
              type="button"
              disabled={googleLoading} // Disable the button when loading
              onClick={() => signUpWith("oauth_google")}
            >
              {googleLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Please wait...
                </>
              ) : (
                <>
                  <span className="mr-2">
                    <FcGoogle size={24} />
                  </span>
                  Google Account
                </>
              )}
            </Button>
          </form>

          {/* Sign Up */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* MacBook Image */}
      <Image
        src="/macbook.svg"
        alt="macbook"
        width={100}
        height={100}
        objectFit="cover"
        className="absolute -right-[40%] -bottom-[20%] hidden lg:block w-[100%] h-[100%] animate-slide-right"
      />
    </div>
  );
};

export default Page;
