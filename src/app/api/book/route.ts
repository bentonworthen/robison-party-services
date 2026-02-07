import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const body = await request.json();
    const { name, email, phone, address, partySize, notes, date } = body;

    // Send notification email to Amber
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'robisonfam03@gmail.com',
      replyTo: email,
      subject: `🎯 New Booking Request from ${name}`,
      html: `
        <h1>New Nerf Party Booking Request!</h1>
        
        <h2>Customer Details</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Address:</strong> ${address}</li>
          <li><strong>Party Size:</strong> ${partySize || 'Not specified'}</li>
        </ul>
        
        <h2>Party Date</h2>
        <p style="font-size: 18px; font-weight: bold;">${date}</p>
        
        ${notes ? `<h2>Special Requests</h2><p>${notes}</p>` : ''}
        
        <hr />
        <p style="color: #666;">Reply to this email to respond directly to the customer, or call ${phone}.</p>
      `,
    });

    console.log('Email sent:', result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to send booking request' },
      { status: 500 }
    );
  }
}
