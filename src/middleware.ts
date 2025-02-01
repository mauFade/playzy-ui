import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";

const publicRoutes = [
  { path: "/register", whenAuthenticated: "redirect" },
  { path: REDIRECT_WHEN_NOT_AUTHENTICATED, whenAuthenticated: "redirect" },
] as const;

export function middleware(r: NextRequest) {
  const path = r.nextUrl.pathname;
  const publicRoute = publicRoutes.find((r) => r.path === path);
  const token = r.cookies.get("jwtToken");

  const redirectUrl = r.nextUrl.clone();

  redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;

  // Rota é pública, não está autenticado
  if (!token && publicRoute) {
    return NextResponse.next();
  }

  // Rota é privata e não está autenticado
  if (!publicRoute && !token) {
    return NextResponse.redirect(redirectUrl);
  }

  // Rota é privata, está autenticado, verificar validade do token
  if (!publicRoute && token) {
    const decodedToken = jwtDecode(token.value);
    const exp = decodedToken.exp;

    if (!exp) {
      return NextResponse.redirect(redirectUrl);
    }

    const expiredDate = new Date(decodedToken.exp!);

    // Token está expirado, redirecionar para tela de login
    if (expiredDate.getTime() > Date.now()) {
      return NextResponse.redirect(redirectUrl);
    }

    // Rota privata, com autenticação e token ainda válido
    return NextResponse.redirect(r.nextUrl);
  }
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
