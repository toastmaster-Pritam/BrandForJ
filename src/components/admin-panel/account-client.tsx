"use client";
import Image from "next/image";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

type FormDataState = {
  firstName: string;
  lastName: string;
  email: string;
  file: File | string | null; // Accepts File or a URL string
};

export default function AccountClient({
  firstName,
  lastName,
  email,
  file,
}: FormDataState) {
  const [formData, setFormData] = useState<FormDataState>({
    firstName: firstName || "Killan",
    lastName: lastName || "James",
    email: email || "killanjames@gmail.com",
    file: file || "/avatar1.svg", // Default to avatar1.svg if no file provided
  });
  const [loading,setLoading]=useState(false)

  const [previewUrl, setPreviewUrl] = useState<string>(
    typeof file === "string" ? file : "/avatar1.svg" // Initialize with the provided URL or default
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "file" && files?.[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, file }));
      setPreviewUrl(URL.createObjectURL(file)); // Generate a preview URL for the file
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isDataUnchanged =
    formData.firstName === firstName &&
    formData.lastName === lastName &&
    formData.email === email &&
    (formData.file === file || (file instanceof File && formData.file instanceof File && file.name === formData.file.name));

    console.log("unchanged",isDataUnchanged)

  // If no changes, show a notification and return early
  if (isDataUnchanged) {
    toast.info("No changes detected. Please update at least one field.");
    return;
  }

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    if (formData.file && formData.file instanceof File) {
      formDataToSend.append("file", formData.file);
    }
    setLoading(true)

    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      console.log(data);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
    finally{
        setLoading(false)
    }
  };

  return (
    <>
      {/* Profile Image */}
      <div className="absolute top-48 left-1/3 transform -translate-x-1/2 md:top-44 md:left-24 z-20">
        <Image
          src={previewUrl} // Use previewUrl for the image source
          alt="Profile Picture"
          width={120}
          height={120}
          className="rounded-full border-4 border-white shadow-md w-32 h-32 object-cover"
        />
      </div>

      {/* Main content */}
      <div className="mx-auto mt-32 max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
        <form
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 col-span-1 sm:col-span-2 gap-3 ">
            {/* First Name */}
            <div className="sm:col-span-1 col-span-2 w-full">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
              />
            </div>

            {/* Last Name */}
            <div className="sm:col-span-1 col-span-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail color="gray" size={20} />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 pl-10"
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="col-span-1">
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Profile Picture
            </label>
            {formData.file instanceof File ? (
              // Display the uploaded filename
              <div className="mt-1 flex justify-between items-center rounded-md border border-gray-300 px-4 py-3 bg-gray-50">
                <span className="text-sm text-gray-700">
                  {formData.file.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, file: null }));
                    setPreviewUrl("/avatar1.svg"); // Reset to default
                  }}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              // Render the upload dropbox
              <div className="mt-1 flex justify-center items-center rounded-md border-2 border-dashed border-gray-300 px-6 py-5">
                <div className="text-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    <span>Click to upload or drag and drop</span>
                    <input
                      id="file-upload"
                      name="file"
                      type="file"
                      onChange={handleChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    SVG, PNG, JPG, or GIF (max, 800x400px)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3">
            <Button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Please wait...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
