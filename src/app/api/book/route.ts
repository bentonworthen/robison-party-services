import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const body = await request.json();
    const { name, email, phone, address, partySize, notes, date } = body;

    // Send notification email to Amber
    await resend.emails.send({
      from: 'Robison Party Services <bookings@resend.dev>',
      to: 'robisonfam03@gmail.com',
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
        <p style="color: #666;">Reply to this email or call ${phone} to confirm the booking.</p>
      `,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'Robison Party Services <bookings@resend.dev>',
      to: email,
      subject: `Your Nerf Party Booking Request - ${date}`,
      html: `
        <h1>Thanks for booking with Robison Party Services! 🎯</h1>
        
        <p>Hi ${name},</p>
        
        <p>We received your booking request for <strong>${date}</strong>.</p>
        
        <p>We'll confirm your party within 24 hours. If you have any questions, just reply to this email!</p>
        
        <h2>Your Booking Details</h2>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Delivery Address:</strong> ${address}</li>
          <li><strong>Package:</strong> 25 Nerf Guns - $40</li>
        </ul>
        
        <p>Get ready for an epic Nerf battle!</p>
        
        <p>— Robison Party Services</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to send booking request' },
      { status: 500 }
    );
  }
}
