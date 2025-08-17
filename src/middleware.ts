import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdmin = token?.role === "ADMIN"
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")
    const isLoginPage = req.nextUrl.pathname === "/admin/login"

    // Login sayfasındayken admin ise dashboard'a yönlendir
    if (isLoginPage && isAdmin) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }

    // Admin route'larına erişim kontrolü (login hariç)
    if (isAdminRoute && !isLoginPage && !isAdmin) {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Login sayfası her zaman erişilebilir
        if (req.nextUrl.pathname === "/admin/login") {
          return true
        }
        // Diğer admin route'lar için token gerekli
        return !!token
      }
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}
