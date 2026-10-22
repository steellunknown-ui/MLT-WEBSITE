import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  organization: z.string().optional(),
  subject: z.string().min(2, "Please select or specify an enquiry category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(), // Bot trap
});

const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || "deepnarayan1982@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Tandon Group Enquiry <onboarding@resend.dev>";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Bot check: Honeypot must be empty
    if (body.honeypot) {
      return NextResponse.json(
        { success: false, error: "Spam detected." },
        { status: 400 }
      );
    }

    // 2. Validate input schema
    const parseResult = ContactSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: parseResult.error.issues.map((i) => i.message).join(", "),
        },
        { status: 400 }
      );
    }

    const { name, email, organization, subject, message } = parseResult.data;

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn(
        `[Contact API] RESEND_API_KEY is not configured in .env.local. Simulating dispatch to ${RECIPIENT_EMAIL}:`,
        { name, email, organization, subject, message }
      );

      // Return simulated success during local development so user isn't blocked
      return NextResponse.json({
        success: true,
        simulated: true,
        message:
          "Enquiry recorded successfully (Development mode: Set RESEND_API_KEY in .env.local to deliver live emails).",
      });
    }

    // 3. Send email using Resend
    const resend = new Resend(apiKey);

    const emailHtml = (targetRecipient: string, isFallback: boolean = false) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f7fb; color: #0f172a; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #c9a24b; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background-color: #06122e; color: #c9a24b; padding: 28px; text-align: center; border-bottom: 2px solid #c9a24b; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
            .header p { margin: 6px 0 0; font-size: 13px; color: #ffffff; opacity: 0.8; }
            .alert-box { background: #fefce8; border-bottom: 1px solid #fef08a; padding: 12px 24px; font-size: 12px; color: #854d0e; line-height: 1.5; }
            .content { padding: 32px 28px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; color: #c9a24b; margin-bottom: 4px; }
            .value { font-size: 15px; color: #06122e; line-height: 1.5; font-weight: 500; }
            .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #c9a24b; padding: 18px; border-radius: 2px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; margin-top: 6px; }
            .footer { background: #f8fafc; padding: 16px 28px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Executive Office Enquiry</h1>
              <p>Website Correspondence for Manohar Lal Tandon</p>
            </div>
            ${
              isFallback
                ? `
            <div class="alert-box">
              <strong>Developer Notice:</strong> This enquiry was routed to the account owner mailbox because custom domain verification on Resend is required to deliver directly to <strong>${RECIPIENT_EMAIL}</strong>. Verify your domain at <a href="https://resend.com/domains" style="color: #854d0e; text-decoration: underline;">resend.com/domains</a> to enable unhindered direct routing.
            </div>
            `
                : ""
            }
            <div class="content">
              <div class="field">
                <div class="label">Sender Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color: #06122e; text-decoration: underline;">${email}</a></div>
              </div>
              ${
                organization
                  ? `
              <div class="field">
                <div class="label">Organization / Affiliation</div>
                <div class="value">${organization}</div>
              </div>
              `
                  : ""
              }
              <div class="field">
                <div class="label">Enquiry Category</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              Intended recipient: <strong>${RECIPIENT_EMAIL}</strong> &bull; Sent via ML Tandon Executive Website
            </div>
          </div>
        </body>
      </html>
    `;

    let emailResponse = await resend.emails.send({
      from: FROM_EMAIL,
      to: [RECIPIENT_EMAIL],
      replyTo: email,
      subject: `[ML Tandon Website] ${subject}: ${name}`,
      html: emailHtml(RECIPIENT_EMAIL, false),
    });

    // Handle Resend free-tier unverified domain restriction gracefully:
    // If testing without a custom domain, Resend will report: "You can only send testing emails to your own email address (xyz@gmail.com)..."
    if (
      emailResponse.error &&
      emailResponse.error.message?.includes("You can only send testing emails to your own email address")
    ) {
      const match = emailResponse.error.message.match(/\(([^)]+)\)/);
      const fallbackEmail = match ? match[1] : null;

      if (fallbackEmail) {
        console.warn(
          `[Contact API] Resend domain restriction encountered. Re-routing test email to account owner: ${fallbackEmail}`
        );

        emailResponse = await resend.emails.send({
          from: FROM_EMAIL,
          to: [fallbackEmail],
          replyTo: email,
          subject: `[ML Tandon Website - Forward for ${RECIPIENT_EMAIL}] ${subject}: ${name}`,
          html: emailHtml(fallbackEmail, true),
        });
      }
    }

    if (emailResponse.error) {
      console.error("[Contact API] Resend error:", emailResponse.error);
      return NextResponse.json(
        { success: false, error: emailResponse.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: emailResponse.data?.id,
      message: "Your message has been delivered to the Chairman's office.",
    });
  } catch (error: any) {
    console.error("[Contact API] Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
