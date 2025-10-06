import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  // ===== PROTECTED ROUTES =====
  // Routes yang memerlukan authentication
  const isProtectedRoute = pathname.startsWith("/dashboard-admin");

  // ===== PUBLIC ROUTES =====
  // Routes yang hanya bisa diakses ketika TIDAK login (redirect ke dashboard jika sudah login)
  const isAuthRoute = pathname.startsWith("/login");

  // Jika user mengakses protected route tanpa token
  if (isProtectedRoute && !token) {
    console.log("🔐 Middleware: Unauthorized access to protected route");

    // Redirect ke login dengan callback URL
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(url);
  }

  // Jika user sudah login dan mencoba akses halaman login
  if (isAuthRoute && token) {
    console.log("✅ Middleware: User already authenticated, redirecting to dashboard");

    // Redirect ke dashboard
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard-admin";

    return NextResponse.redirect(url);
  }

  // Allow request to proceed
  return NextResponse.next();
}

// ===== CONFIG =====
// Tentukan routes mana saja yang akan di-check oleh middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
