import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json("Hello World un dato!");
}

export function DELETE() {
  return NextResponse.json("Hello World delete!");
}

export function PUT() {
  return NextResponse.json("Hello World put!");
}
