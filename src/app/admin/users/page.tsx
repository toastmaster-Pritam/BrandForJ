import React from "react";
import { fetchAllUsers } from "@/app/actions/fetchUserList"; // Adjust the import path
import { getRole } from "@/lib/get-role";
import { Role } from "@/lib/types";
import { redirect } from "next/navigation";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import DataTableWithTagFilter from "@/components/data-table";
import { format } from "date-fns";


const AdminDashboardPage = async () => {
  const role = await getRole();

  if (role !== ("admin" as Role)) {
    console.log("you are not admin");

    redirect("/dashboard");
  }

  // Fetch the user list

  const response = await fetchAllUsers();

//   console.log(response)

  const users = response.map((user:any) => ({
    id:user.id,
    name: `${user.firstName || "Anonymous"} ${user.lastName || " "}`,
    createdAt: format(new Date(user.createdAt).toISOString(),"PPP"),
    creditsLeft:
      user.publicMetadata.credits === undefined
        ? 10
        : user.publicMetadata.credits || 0,
     subscription:false,
     email: user?.emailAddresses?.[0]?.emailAddress || "placeholder@gmail.com"  
  }));

//   console.log("new users", users);

  return (
    <ContentLayout title2="Admin Center - User">
      <DataTableWithTagFilter users={users} />
    </ContentLayout>
  );
};

export default AdminDashboardPage;
