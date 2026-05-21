import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const key = new TextEncoder().encode(process.env.AUTH_SECRET)
const COOKIE_NAME = 'life-planner-session'

const protectedPaths = ['/dashboard', '/meals', '/exercise', '/preferences', '/family', '/settings']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = protectedPaths.some(p => pathname.startsWith(p))

  if (!isProtected) return NextResponse.next()

  const token = request.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    await jwtVerify(token, key)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/meals/:path*', '/exercise/:path*', '/preferences/:path*', '/family/:path*', '/settings/:path*'],
}
