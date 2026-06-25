import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Strict validation with whitespace trimming
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: "Incomplete payload. Please provide your name, email, and message." },
        { status: 400 }
      );
    }

    // Standard email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format provided." },
        { status: 400 }
      );
    }

    // Simulate network/processing delay for frontend UX (1.5s)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Structured Server-side logging
    console.log(`\n[CONTACT FORM SUBMISSION] — ${new Date().toISOString()}`);
    console.log(`Name:    ${name}`);
    console.log(`Email:   ${email}`);
    console.log(`Message:\n${message}`);
    console.log(`--------------------------------------------------------\n`);

    return NextResponse.json(
      { success: true, message: "Message received. I will be in touch shortly." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CONTACT API ERROR]:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Transmission failed." },
      { status: 500 }
    );
  }
}