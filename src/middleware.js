import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
Amplify.configure(config);
import { NextResponse } from 'next/server'
import { fetchAuthSession } from "aws-amplify/auth";
export const protectedRoutes = ["/admin-dashboard", "/user", "/customer"];
export const authRoutes = ["/auth/signup", "/auth/signin"];
export const publicRoutes = ["/", "/payment-customer"];
export async function middleware(request) {
  const currentUserCookie = request.cookies.get("currentUser");
  const currentUser = currentUserCookie ? currentUserCookie.value : null;
  const userRol = currentUserCookie ? JSON.parse(currentUser).role : null;

  if (
    protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) &&
    (!currentUser || Date.now() > new Date((JSON.parse(currentUser).expiredAt) * 1000))
  ) {
    await fetchAuthSession({ forceRefresh: true });
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