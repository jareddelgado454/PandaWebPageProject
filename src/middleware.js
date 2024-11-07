import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
Amplify.configure(config);
import { NextResponse } from 'next/server';
export const protectedRoutes = ["/admin-dashboard", "/user", "/customer"];
export const authRoutes = ["/auth/signup", "/auth/signin"];
export const publicRoutes = ["/", "/payment-customer"];

export async function middleware(request) {
  const currentUserCookie = request.cookies.get("currentUser");
  const currentUser = currentUserCookie ? currentUserCookie.value : null;
  const userRol = currentUser ? JSON.parse(currentUser).role : null;
  const expiredAt = request.cookies.get("expiredAt");
  const isSessionExpired = expiredAt ? Date.now() > expiredAt * 1000 : true;

  if (
    protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) &&
    (!currentUser || isSessionExpired)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect if there is an user authenticated.
  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    if (userRol === 'admin') {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else if (userRol === 'technician') {
      return NextResponse.redirect(new URL("/user", request.url));
    } else  if (userRol === 'customer') {
      return NextResponse.redirect(new URL("/customer", request.url));
    }
  }

  // Block access to the admin routes if the user is not administrator
  if (request.nextUrl.pathname.startsWith("/admin-dashboard") && userRol !== 'admin') {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  // Redirect to the respective routes using user's respective role.
  if (request.nextUrl.pathname.startsWith("/user") && userRol === 'admin') {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  } else if(request.nextUrl.pathname.startsWith("/user") && userRol === 'customer'){
    return NextResponse.redirect(new URL("/customer", request.url));
  }

  // Redirect to the respective routes using user's respective role.
  if (request.nextUrl.pathname.startsWith("/customer") && userRol === 'admin') {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }else if (request.nextUrl.pathname.startsWith("/customer") && userRol === 'technician'){
    return NextResponse.redirect(new URL("/user", request.url));
  }
}
