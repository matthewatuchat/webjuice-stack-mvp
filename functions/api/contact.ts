import type { PagesFunction } from '@cloudflare/workers-types';

interface Env {
  EMAIL: any;
  NOTIFICATION_EMAIL?: string;
}

interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json<ContactForm>();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Store in D1 or KV (optional - add later when D1 is set up)
    // For now, just send email notification

    const notificationEmail = context.env.NOTIFICATION_EMAIL || 'hello@webjuice.com';

    await context.env.EMAIL.send({
      to: notificationEmail,
      from: notificationEmail,
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Message:
${message}`,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequest: PagesFunction = async (context) => {
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return onRequestPost(context);
};
