import { sendEmail } from './lib/emailService';

// Vercel Serverless Function Handler
export default async function handler(req: any, res: any) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    // Validate inputs
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide a valid name.' });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide a subject.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({ success: false, message: 'Message must be at least 10 characters long.' });
    }

    if (message.length > 2500) {
      return res.status(400).json({ success: false, message: 'Message exceeds maximum length (2500 characters).' });
    }

    // Dispatch email
    const result = await sendEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(200).json(result);
  } catch (err: any) {
    console.error('[API/contact:ERROR]', err.message);
    return res.status(500).json({
      success: false,
      message: err.message || 'An unexpected internal error occurred while dispatching the message.',
    });
  }
}
