import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth) {
    const [user, pass] = atob(auth.split(" ")[1] || "").split(":");
    if (user === process.env.DASH_USER && pass === process.env.DASH_PASS) {
      return NextResponse.next();
    }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Mission Control"' },
  });
}

// Protect the whole dashboard, but leave the agent heartbeat endpoint open
export const config = {
  matcher: ["/((?!api/agents/state).*)"],
};
