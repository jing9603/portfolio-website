import { NextRequest, NextResponse } from "next/server";

const PASSWORD = "petlive2026";
const EXPIRES = new Date("2026-09-01T00:00:00Z"); // link dies end of 2026-08-31
const COOKIE_NAME = "petlive_gate";
const GATED_PATH = "/portfolio/petlive-market-research";

function loginPage(error?: string) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PetLive Market Research · Password Required</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #0b0b0c; color: #f2f2f2; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
  form { background: #17171a; border: 1px solid #2a2a2e; border-radius: 12px; padding: 40px; width: 320px; max-width: 90vw; }
  h1 { font-size: 16px; font-weight: 600; margin: 0 0 8px; }
  p { font-size: 13px; color: #9a9a9e; margin: 0 0 20px; }
  input { width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px; border: 1px solid #333338; background: #0b0b0c; color: #f2f2f2; font-size: 14px; margin-bottom: 12px; }
  button { width: 100%; padding: 10px 12px; border-radius: 8px; border: none; background: #FB7400; color: #111; font-weight: 600; font-size: 14px; cursor: pointer; }
  .error { color: #ff6b6b; font-size: 13px; margin: -8px 0 12px; }
</style>
</head>
<body>
<form method="POST">
  <h1>PetLive Market Research</h1>
  <p>Confidential — enter password to view.</p>
  ${error ? `<div class="error">${error}</div>` : ""}
  <input type="password" name="password" placeholder="Password" autofocus>
  <button type="submit">Enter</button>
</form>
</body>
</html>`;
}

export async function middleware(request: NextRequest) {
  if (Date.now() >= EXPIRES.getTime()) {
    return new NextResponse("This link has expired.", { status: 410 });
  }

  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (cookie === PASSWORD) {
    return NextResponse.next();
  }

  const isTopLevelPage = request.nextUrl.pathname === GATED_PATH;

  if (request.method === "POST" && isTopLevelPage) {
    const form = await request.formData();
    const password = form.get("password");

    if (password === PASSWORD) {
      const response = NextResponse.redirect(request.nextUrl, 303);
      response.cookies.set(COOKIE_NAME, PASSWORD, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: GATED_PATH,
        maxAge: Math.floor((EXPIRES.getTime() - Date.now()) / 1000)
      });
      return response;
    }

    return new NextResponse(loginPage("Incorrect password."), {
      status: 401,
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }

  if (isTopLevelPage) {
    return new NextResponse(loginPage(), {
      status: 401,
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }

  return new NextResponse("Authentication required.", { status: 401 });
}

export const config = {
  matcher: [
    "/portfolio/petlive-market-research",
    "/portfolio/petlive-market-research/:path*"
  ]
};
