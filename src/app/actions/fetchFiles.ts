'use server'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"


export async function fetchFiles():Promise<any>{
    const {userId}= await auth()

    if(!userId){
        return {
            error:"User not found!"
        }
    }

    console.log("user id",userId)

    try {

        const imageUrls=await db.generatedFile.findMany({
            where:{
                userId
            }
        })

        console.log("user ka image",imageUrls)

        return {imageUrls}
        
    } catch (error) {

        console.log("error baby",error)

        return {
            error:"database error!"
        }
        
    }
}