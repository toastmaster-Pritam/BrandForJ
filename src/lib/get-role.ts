import { currentUser } from "@clerk/nextjs/server";
import { Role } from "./types";

export async function getRole():Promise<Role>{
    const user= await currentUser()

    return user?.publicMetadata?.role as Role

}