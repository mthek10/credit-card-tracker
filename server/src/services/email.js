import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  // Only create transporter if we have real SMTP config
  if (process.env.SMTP_HOST) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    return transporter;
  }

  return null;
}

export async function sendMagicLinkEmail(email, token, baseUrl) {
  const magicLink = `${baseUrl}/auth/verify?token=${token}`;
  const transport = getTransporter();

  // If no SMTP configured, just log the link (for dev/testing)
  if (!transport) {
    console.log('========================================');
    console.log('MAGIC LINK (no SMTP configured)');
    console.log(`Email: ${email}`);
    console.log(`Link: ${magicLink}`);
    console.log('========================================');
    return { messageId: 'console-' + Date.now(), magicLink };
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || '"CardTracker" <noreply@cardtracker.app>',
    to: email,
    subject: 'Your CardTracker Login Link',
    text: `
Click this link to log in to CardTracker:

${magicLink}

This link expires in 15 minutes.

If you didn't request this, you can safely ignore this email.
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6; margin: 0; padding: 40px 20px;">
  <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">CardTracker</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 14px;">Credit Card Benefits Tracker</p>
    </div>
    <div style="padding: 32px;">
      <h2 style="color: #1f2937; margin: 0 0 16px 0; font-size: 20px;">Log in to your account</h2>
      <p style="color: #6b7280; margin: 0 0 24px 0; line-height: 1.6;">
        Click the button below to securely log in to CardTracker. This link will expire in 15 minutes.
      </p>
      <a href="${magicLink}" style="display: block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 16px 24px; border-radius: 12px; font-weight: 600; text-align: center; font-size: 16px;">
        Log in to CardTracker
      </a>
      <p style="color: #9ca3af; margin: 24px 0 0 0; font-size: 12px; text-align: center;">
        If you didn't request this email, you can safely ignore it.
      </p>
    </div>
    <div style="background: #f9fafb; padding: 16px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; margin: 0; font-size: 12px;">
        Having trouble? Copy and paste this link into your browser:<br>
        <span style="color: #6b7280; word-break: break-all;">${magicLink}</span>
      </p>
    </div>
  </div>
</body>
</html>
    `.trim(),
  };

  const info = await transport.sendMail(mailOptions);
  return info;
}
