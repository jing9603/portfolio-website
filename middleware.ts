import { NextRequest, NextResponse } from "next/server";

const PASSWORD = "petlive2026";
const EXPIRES = new Date("2026-09-01T00:00:00Z"); // link dies end of 2026-08-31

export function middleware(request: NextRequest) {
  if (Date.now() >= EXPIRES.getTime()) {
    return new NextResponse("This link has expired.", { status: 410 });
  }

  const auth = request.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const [, password] = atob(encoded).split(":");
      if (password === PASSWORD) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="PetLive Market Research"' }
  });
}

export const config = {
  matcher: [
    "/portfolio/petlive-market-research",
    "/portfolio/petlive-market-research/:path*"
  ]
};
