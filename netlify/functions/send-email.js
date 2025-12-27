const nodemailer = require('nodemailer');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Simple email format check
function validEmail(e) {
  if (!e) return false;
  // very small regex for basic validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: 'Method Not Allowed',
    };
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: false, error: 'Invalid JSON' }),
    };
  }

  const { name, email, message } = data;
  if (!message || !message.toString().trim()) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: false, error: 'Message is required' }),
    };
  }

  const textMessage = message.toString().trim();
  if (textMessage.length > 10000) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: false, error: 'Message too long' }),
    };
  }

  // Transport config using environment variables (set these in Netlify site settings)
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const toEmail = process.env.TO_EMAIL; // where the portfolio owner receives messages
  const fromEmail = process.env.FROM_EMAIL || user; // optional override

  if (!host || !user || !pass || !toEmail) {
    console.error('SMTP config missing:', { host, user, pass: !!pass, toEmail });
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: false, error: 'SMTP configuration is missing on the server' }),
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  // Verify connection configuration (helps surface auth/connect issues quickly)
  try {
    await transporter.verify();
  } catch (err) {
    console.error('SMTP verify failed:', err && err.message);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: false, error: 'Failed to connect to SMTP server' }),
    };
  }

  const safeName = (name || 'Anonymous').toString().slice(0, 200);
  const safeEmail = (email || '').toString().slice(0, 200);

  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: `Portfolio contact from ${safeName}${safeEmail ? ` <${safeEmail}>` : ''}`,
    text: `Name: ${safeName}\nEmail: ${safeEmail || 'Not provided'}\n\nMessage:\n${textMessage}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(safeEmail || 'Not provided')}</p>
      <hr />
      <div>${escapeHtml(textMessage).replace(/\n/g, '<br/>')}</div>
    `,
    replyTo: validEmail(safeEmail) ? safeEmail : undefined,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info && info.messageId);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error('send-email error:', err && err.message);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: false, error: 'Failed to send email' }),
    };
  }
};

// simple HTML escape to avoid naive injections in the email body
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
