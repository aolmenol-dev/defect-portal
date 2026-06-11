exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Check secret token from the form
  const secret = event.headers['x-form-secret'];
  if (secret !== process.env.FORM_SECRET) {
    return { statusCode: 403, body: 'Forbidden' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  // Sanitize inputs
  const sanitize = (str) => String(str || '').replace(/<[^>]*>/g, '').trim().slice(0, 500);

  const payload = {
    unit_id:       sanitize(data.unit_id),
    room:          sanitize(data.room),
    category:      sanitize(data.category),
    priority:      sanitize(data.priority),
    description:   sanitize(data.description),
    contact_name:  sanitize(data.contact_name),
    contact_email: sanitize(data.contact_email),
    contact_phone: sanitize(data.contact_phone),
    submitted_at:  new Date().toISOString(),
  };

  // Forward to Workato — URL is hidden in environment variable
  const response = await fetch(process.env.WORKATO_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return { statusCode: 502, body: 'Upstream error' };
  }

  const ref = 'DEF-' + Date.now().toString(36).toUpperCase();
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, ref }),
  };
};
