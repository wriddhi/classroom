import { NextRequest, NextResponse } from "next/server"

export default async function middleware(req: NextRequest) {

  // const path = req.nextUrl.pathname

  // if (path === "/") {
  //   return NextResponse.next()
  // }

  // const cookies = req.cookies.getAll()
  // const auth = cookies.find((cookie) => cookie.name === "ars-lms-auth-token")


  // if (!auth && path === "/dashboard") {
  //   return NextResponse.redirect(new URL("/login", req.url))
  // } else if (auth && path === "/login") {
  //   return NextResponse.redirect(new URL("/dashboard", req.url))
  // }

  // if (path.includes("/api")) {
  //   // Check for bearer token in authorization header

  //   const authHeader = req.headers.get("authorization")
  //   if (!authHeader) {
  //     console.log("NO AUTH HEADER")
  //     return NextResponse.redirect(new URL('/unauthorized-api-access', req.url))
  //   }
  //   const token = authHeader.split(" ")[1]
  //   if (!token) {
  //     console.log("NO TOKEN")
  //     return NextResponse.redirect(new URL('/unauthorized-api-access', req.url))
  //   }
  //   // Verify token
  //   if (token !== process.env.NEXT_PUBLIC_API_KEY) {
  //     console.log("INVALID API KEY")
  //     return NextResponse.redirect(new URL('/unauthorized-api-access', req.url))
  //   }
  //   console.log("API KEY VERIFIED")

  // }


  return NextResponse.next()
}