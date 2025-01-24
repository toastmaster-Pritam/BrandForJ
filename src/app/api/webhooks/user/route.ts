import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { db } from "@/lib/db";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };

  const wh = new Webhook(webhookSecret);

  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (error) {
    console.error("Webhook verification failed:", (error as Error).message);
    return NextResponse.json({ message: "Error occurred" }, { status: 400 });
  }

  const eventType: EventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, ...attributes } = evt.data as UserEventData;

    console.log("User ID:", id);
    console.log("Attributes:", attributes);

    const email = attributes.email_addresses?.[0]?.email_address || null; // Extract first email address
    const firstName = attributes.first_name || null;
    const lastName = attributes.last_name || null;
    const avatarUrl = attributes.image_url || null;

    try {
      await db.user.upsert({
        where: {
          clerkUserId: id as string, // Unique identifier for the user
        },
        create: {
          clerkUserId: id as string,
          email:email as string,
        },
        update: {
          email:email as string,
         
        },
      });

      console.log(`User ${id} successfully upserted.`);
    } catch (dbError) {
      console.error("Database upsert error:", dbError);
      return NextResponse.json(
        { message: "Database error during upsert" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Successful" }, { status: 200 });
}

type EventType = "user.created" | "user.updated" | "*";

type EmailAddress = {
  email_address: string;
  [key: string]: unknown;
};

type UserEventData = {
  id: string;
  email_addresses?: EmailAddress[];
  first_name?: string;
  last_name?: string;
  image_url?: string;
  [key: string]: unknown; // Allow other unexpected fields
};

type Event = {
  data: UserEventData;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
