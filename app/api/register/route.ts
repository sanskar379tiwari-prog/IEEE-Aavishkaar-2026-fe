import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Registration } from "@/lib/models/Registration";
import { RegistrationSchema } from "@/lib/validations/registration";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validationResult = RegistrationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { message: "Validation error", errors: validationResult.error.format() },
        { status: 400 }
      );
    }

    const validData = validationResult.data;
    const MAX_TEAM_MEMBERS = 3;

    if (validData.teamMembers.length > MAX_TEAM_MEMBERS) {
      return NextResponse.json(
        { message: `You can only add up to ${MAX_TEAM_MEMBERS} team members.` },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

    if (db) {
      const newRegistration = new Registration(validData);
      await newRegistration.save();
    }

    return NextResponse.json({ message: "Registration successful" }, { status: 201 });
  } catch (error) {
    console.error("Registration endpoint error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
