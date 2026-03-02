import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set in environment variables')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('RESEND_API_KEY is not set in environment variables')
      }
      return NextResponse.json(
        { error: 'Server configuration error: RESEND_API_KEY not found. Please add it to .env.local' },
        { status: 500 }
      )
    }

    const resend = getResendClient()

    const body = await request.json()
    const { name, email, subject, message, type = 'contact' } = body

    // Validation
    if (!name || !email || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Prepare email content based on type
    let adminHtml = ''
    let userHtml = ''

    if (type === 'newsletter') {
      adminHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">New Newsletter Subscription</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    } else {
      adminHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">New ${subject} Inquiry</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #d97706;">
              ${message?.replace(/</g, '&lt;').replace(/>/g, '&gt;') || 'No message provided'}
            </p>
            <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
              <strong>Date:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `

      userHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">Thank you for contacting us!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you soon. Our team will review your inquiry and contact you shortly.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Your Details:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Name: ${name}</li>
              <li>Email: ${email}</li>
              <li>Subject: ${subject}</li>
            </ul>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            Best regards,<br/>
            <strong>Mahim Architect Team</strong>
          </p>
        </div>
      `
    }

    // Send email to admin (mahimhr01@gmail.com)
    if (process.env.NODE_ENV !== 'production') {
      console.log('Sending admin email with Resend...')
    }
    const adminEmailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'maste1432ra@gmail.com',
      replyTo: email,
      subject: `[${type.toUpperCase()}] ${subject}`,
      html: adminHtml,
    })

    if (process.env.NODE_ENV !== 'production') {
      console.log('Admin email result:', adminEmailResult)
    }

    if (adminEmailResult.error) {
      throw new Error(`Admin email failed: ${adminEmailResult.error.message}`)
    }

    // Send confirmation email to user (only for non-newsletter)
    if (type !== 'newsletter') {
      const userEmailResult = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'We received your message - Mahim Architect',
        html: userHtml,
      })

      if (userEmailResult.error) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`User confirmation email failed: ${userEmailResult.error.message}`)
        }
        // Don't fail the whole request if confirmation email fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Email API error:', error)
    }
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error details:', errorMessage)
    }
    return NextResponse.json(
      { error: 'Failed to send email', details: process.env.NODE_ENV === 'production' ? 'Server error' : errorMessage },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { status: 'Email API not configured - missing API key' },
      { status: 503 }
    )
  }
  return NextResponse.json(
    { status: 'Email API is operational' },
    { status: 200 }
  )
}
