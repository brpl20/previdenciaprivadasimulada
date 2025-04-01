// src/app/api/send-ebook/route.ts
// api/app/send-ebook/route.ts
import { NextResponse } from "next/server";

// export const runtime = 'edge'; // Add this line if you're using Next.js 13 with app directory

export async function POST(request: Request) {
  console.log("POST request received at /api/send-ebook");

  try {
    const data = await request.json();
    console.log("Received data:", data);

    // Validate input
    if (!data.email || !data.name) {
      console.log("Validation failed: Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Log environment variables (be careful not to log sensitive information in production)
    console.log("EMAILJS_SERVICE_ID:", process.env.EMAILJS_SERVICE_ID);
    console.log("EMAILJS_TEMPLATE_ID:", process.env.EMAILJS_TEMPLATE_ID);
    console.log("EMAILJS_PRIVATE_KEY:", process.env.EMAILJS_PRIVATE_KEY);
    console.log("EMAILJS_USER_ID:", process.env.EMAILJS_USER_ID ? "Set" : "Not set");

    if (!process.env.EMAILJS_SERVICE_ID || !process.env.EMAILJS_TEMPLATE_ID || !process.env.EMAILJS_USER_ID) {
      console.error("Missing EmailJS environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    console.log("Preparing to send email via EmailJS");

    interface EmailData {
      email: string;
      name: string;
    }
    const emailJsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          to_email: data.email,
          to_name: data.name,
        },
      }),
    });

    console.log("EmailJS response status:", emailJsResponse.status);

    if (emailJsResponse.ok) {
      console.log("Email sent successfully");
      return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } else {
      const error = await emailJsResponse.text();
      console.error("Failed to send email:", error);
      return NextResponse.json({ message: "Failed to send email", error }, { status: emailJsResponse.status });
    }
  } catch (error) {
    console.error("An error occurred while sending the email:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}