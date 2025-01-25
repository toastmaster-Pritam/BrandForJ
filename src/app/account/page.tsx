import Image from "next/image";
import { ContentLayout } from "@/components/admin-panel/content-layout";

import AccountClient from "@/components/admin-panel/account-client";
import { fetchAccountDetails } from "../actions/fetchAccountDetails";

export default async function AccountPage() {
  const { user } = await fetchAccountDetails();

  console.log("account details", user?.avatarUrl);

  return (
    <ContentLayout title2="Account">
      {/* Header section */}
      <div className="relative h-64 w-full rounded-lg overflow-hidden">
        {/* Background Image */}
        <Image
          src="/foreground.webp"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute inset-0 z-0"
        />

        <div className="relative z-10 flex flex-col justify-center items-center h-full">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white w-fit">
            PROFILE
          </h1>
          <h2 className="text-3xl md:text-6xl font-extrabold text-white w-fit">
            Settings
          </h2>
        </div>
      </div>

      <AccountClient
        firstName={user?.firstName}
        lastName={user?.lastName}
        email={user?.email}
        file={user?.avatarUrl}
      />
    </ContentLayout>
  );
}
