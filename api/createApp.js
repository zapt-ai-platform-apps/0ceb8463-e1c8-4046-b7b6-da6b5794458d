import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.PROJECT_ID
    }
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { name, description } = req.body;
    // Here you would integrate with your backend or AI service to create the app
    // For demonstration, we'll simulate a generated app link
    const appLink = `https://generatedapps.com/${encodeURIComponent(name)}`;

    res.status(200).json({ appLink });
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error creating app:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}