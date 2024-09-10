import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
export function middleware(request: NextRequest) {
   if(request.nextUrl.pathname === "/" && cookies().get("token")){
   return NextResponse.redirect(new URL("/home", request.url));
   }
   if(request.nextUrl.pathname === "/home"){
    if(!cookies().get("token")){
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
   }
}
