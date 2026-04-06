import { NextResponse } from "next/server";

export async function GET() {
  // In a production app, you might fetch this from a database 'Config' collection.
  const MAX_TEAM_MEMBERS = 3; // Total members allowed dynamically.

  return NextResponse.json({ maxMembers: MAX_TEAM_MEMBERS });
}
