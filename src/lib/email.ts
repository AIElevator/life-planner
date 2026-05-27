import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendPasswordResetEmail(email: string, token: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const resetUrl = `${appUrl}/reset-password?token=${token}`

  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'Life Planner <onboarding@resend.dev>',
    to: email,
    subject: 'Reset your password',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #ffffff;">
        <div style="margin-bottom: 32px;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #34d399, #0d9488); display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <span style="color: white; font-size: 20px;">🏋️</span>
          </div>
          <h1 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #111827;">Reset your password</h1>
          <p style="margin: 0; color: #6b7280; font-size: 15px; line-height: 1.6;">
            We received a request to reset the password for your Life Planner account.
            Click the button below to choose a new password.
          </p>
        </div>

        <a href="${resetUrl}"
           style="display: inline-block; background: #059669; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px; padding: 12px 28px; border-radius: 10px; margin-bottom: 24px;">
          Reset password
        </a>

        <p style="color: #9ca3af; font-size: 13px; line-height: 1.6; margin: 0;">
          This link expires in <strong>1 hour</strong>. If you didn't request a password reset,
          you can safely ignore this email — your password won't change.
        </p>

        <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 24px 0;" />
        <p style="color: #d1d5db; font-size: 12px; margin: 0;">
          Life Planner · If the button doesn't work, copy this link: ${resetUrl}
        </p>
      </div>
    `,
  })
}
