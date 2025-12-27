# Netlify + Gmail email setup (non-technical, step-by-step)

This file explains, in simple non-technical language, how to make the contact form on your site send email using a Netlify serverless function and a Gmail account.

Important: do NOT put your Gmail password in any code file. Use Netlify environment variables (safe place) or a local `.env` file for testing.

Steps

1. Create a Gmail App Password
   - Open your Google Account settings → Security.
   - Turn ON 2-Step Verification if it is off.
   - Under "App passwords" create a new app password (choose Mail / Other) and copy the 16-character password.

2. Add the credentials to Netlify (production)
   - Go to your site on netlify.com → Site settings → Build & deploy → Environment variables.
   - Add these variables and their values (replace with your info):
     - SMTP_HOST = smtp.gmail.com
     - SMTP_PORT = 465
     - SMTP_USER = your.email@gmail.com
     - SMTP_PASS = the 16-character app password you copied
     - TO_EMAIL = the email address where you want to receive messages (can be your Gmail)
     - FROM_EMAIL = "Your Name <your.email@gmail.com>"  (optional)
   - Save the changes.

3. Local testing (optional)
   - For local testing create a file named `.env` in the project root (do not commit it to Git).
   - Put the same keys and values from step 2 into `.env`.
   - Add `.env` to `.gitignore` so it is never pushed to GitHub.

4. Install the needed package (one-time)
   - On your computer, open a terminal in the project folder and run:
     npm install nodemailer

5. How it works when deployed
   - Netlify runs a small serverless function (file is in `netlify/functions/send-email.js`).
   - When someone fills the contact form, the website sends the form data to that function.
   - The function uses the Gmail credentials (from Netlify settings) to send the message to `TO_EMAIL`.

6. Test the form
   - Deploy your site to Netlify or run locally with `netlify dev` (if you have the Netlify CLI).
   - Open the site, fill the contact form and send a message.
   - Check the `TO_EMAIL` inbox for the message.

7. Troubleshooting (simple)
   - If nothing arrives:
     - Check that the environment variables in Netlify are set and saved.
     - Make sure you used the App Password (not your normal Google password).
     - Look in Netlify's Function logs (Netlify dashboard → Functions → Logs) for errors.

8. Important limits & tips
   - Gmail has sending limits (daily). For many messages use a service like SendGrid or Mailgun.
   - Keep your app password secret. If it leaks, revoke it in your Google Account.
   - If messages go to spam, consider using a professional email provider and authenticate your sending domain.

If you want, I can also add:
- A `.env.example` file showing the variable names (no real secrets),
- A `.gitignore` entry for `.env`,
- A short checklist to run `netlify dev` locally.

That's it — tell me which extra file you'd like created next.
