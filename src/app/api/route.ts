import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  res.headers.set("x-custom-header", "hello world");
  return NextResponse.next();
}