import { signOut } from 'aws-amplify/auth';
import { NextResponse } from 'next/server'
export const protectedRoutes = ["/admin-dashboard", "/user"];
export const authRoutes = ["/auth/signup", "/auth/signin"];
export const publicRoutes = ["/"];
export function middleware(request) {
  const currentUserCookie = request.cookies.get("currentUser");
  const currentUser = currentUserCookie ? currentUserCookie.value : null;
  const userRol = currentUserCookie ? JSON.parse(currentUser).role : null;

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!currentUser || Date.now() > new Date((JSON.parse(currentUser).expiredAt) * 1000))
  ) {
    request.cookies.delete("currentUser");
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("currentUser");
    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    console.log("allowed");
    if(JSON.parse(currentUser).role === 'admin') {
      return NextResponse.redirect(new URL("/admin-dashboard/", request.url));
    }else {
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/admin-dashboard") && userRol !== 'admin') {
    const response = NextResponse.redirect(new URL("/user", request.url));
    return response;
  }

  if (request.nextUrl.pathname.startsWith("/user") && userRol === 'admin') {
    const response = NextResponse.redirect(new URL("/admin-dashboard", request.url));
    return response;
  }
}