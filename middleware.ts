import { KeyDb } from 'models/blog'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const AppKey = request.cookies.get('appKey')?.value
  if (AppKey === process.env.APP_KEY) {
    NextResponse.next()
  } else {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
export const config = {
  matcher: '/admin/:path*',
}