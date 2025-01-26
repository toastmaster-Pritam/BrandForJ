"use server"
import { clerkClient, currentUser } from "@clerk/nextjs/server";


export async function fetchAllUsers():Promise<any>{

    

    const user = await currentUser();

    if (!user) {
        return { success: false, error: "You need to sign in first!" };
      }

    const role=user?.publicMetadata?.role;
    console.log("role",role)


    if(role!=="admin"){
        return {
            success:false,
            error:"You are not authorized to access the data!"
        }
    }

    const client=await clerkClient()

    const response=await client.users.getUserList();


    return response.data

    

}