import { NextRequest, NextResponse } from 'next/server';
import { EmailTemplate } from '@/components/email-template';
import { resend } from '@/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const { email, message } = await req.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!resend) {
      return NextResponse.json(
        { success: false, message: 'Email service is not configured. Please contact the administrator.' },
        { status: 503 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await resend.emails.send({
      from: 'Fardeen <onboarding@resend.dev>',
      to: ['fardeenmansuri0316@gmail.com'],
      subject: 'Message from Your Portfolio',
      react: EmailTemplate({ Email: email, Message: message }),
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: `Something went wrong while sending email : ${error}` },
        { status: 501 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'I will get in touch with you soon :)' },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Server error occurred : ${error}` },
      { status: 501 }
    );
  }
}

