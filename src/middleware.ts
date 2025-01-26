import { clerkMiddleware, createRouteMatcher, currentUser } from "@clerk/nextjs/server";
import { NextResponse, userAgent } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/test(.*)",
  "/api/webhooks(.*)",
  "/privacy-policy",
  "/terms-conditions"
]);


export default clerkMiddleware(async (auth, request) => {
  // console.log("incoming request",request.url)

  const userAgent = request.headers.get("user-agent") || "";

  // Detect if user is on mobile
  const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);

  if (isMobile) {
    // Redirect to /mobile-not-supported if on mobile
    const mobileRedirectUrl = new URL("/mobile-not-supported", request.url);

    return NextResponse.rewrite(mobileRedirectUrl);
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

// export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)"
  ]
};
