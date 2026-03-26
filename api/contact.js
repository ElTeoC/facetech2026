// Serverless function — forwards contact form to FormSubmit.co
// FormSubmit sends notification to info@facetech2026.com

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Forward to FormSubmit.co
  try {
    const response = await fetch('https://formsubmit.co/ajax/info@facetech2026.com', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: data.message || 'FormSubmit error' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
