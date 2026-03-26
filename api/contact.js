const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const {
    nombre,
    email,
    celular,
    pais,
    ciudad,
    especialidad,
    paquete,
    comentarios
  } = req.body;

  // Validate required fields
  if (!nombre || !email || !celular || !pais || !ciudad || !especialidad || !paquete) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  // Create SMTP transport with Titan (GoDaddy)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // ── Email 1: Notification to FACETECH team ──
  const teamHtml = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0b0f1c;color:#EDE8DF;padding:2rem;border:1px solid #C8A96E;">
    <h1 style="color:#C8A96E;font-size:1.4rem;margin-bottom:1.5rem;border-bottom:1px solid #5c4a2a;padding-bottom:0.8rem;">Nueva Inscripci&oacute;n — FACETECH 2026</h1>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="color:#9a9088;padding:0.5rem 0;font-size:0.85rem;width:140px;">Nombre</td><td style="color:#EDE8DF;padding:0.5rem 0;font-size:0.85rem;"><strong>${nombre}</strong></td></tr>
      <tr><td style="color:#9a9088;padding:0.5rem 0;font-size:0.85rem;">Email</td><td style="color:#EDE8DF;padding:0.5rem 0;font-size:0.85rem;"><a href="mailto:${email}" style="color:#C8A96E;">${email}</a></td></tr>
      <tr><td style="color:#9a9088;padding:0.5rem 0;font-size:0.85rem;">Celular</td><td style="color:#EDE8DF;padding:0.5rem 0;font-size:0.85rem;"><a href="https://wa.me/${celular.replace(/[^0-9]/g,'')}" style="color:#C8A96E;">${celular}</a></td></tr>
      <tr><td style="color:#9a9088;padding:0.5rem 0;font-size:0.85rem;">Pa&iacute;s</td><td style="color:#EDE8DF;padding:0.5rem 0;font-size:0.85rem;">${pais}</td></tr>
      <tr><td style="color:#9a9088;padding:0.5rem 0;font-size:0.85rem;">Ciudad</td><td style="color:#EDE8DF;padding:0.5rem 0;font-size:0.85rem;">${ciudad}</td></tr>
      <tr><td style="color:#9a9088;padding:0.5rem 0;font-size:0.85rem;">Especialidad</td><td style="color:#EDE8DF;padding:0.5rem 0;font-size:0.85rem;">${especialidad}</td></tr>
      <tr style="background:rgba(200,169,110,0.08);"><td style="color:#C8A96E;padding:0.6rem;font-size:0.85rem;font-weight:bold;">Paquete</td><td style="color:#C8A96E;padding:0.6rem;font-size:0.85rem;font-weight:bold;">${paquete}</td></tr>
      ${comentarios ? `<tr><td style="color:#9a9088;padding:0.5rem 0;font-size:0.85rem;">Comentarios</td><td style="color:#EDE8DF;padding:0.5rem 0;font-size:0.85rem;">${comentarios}</td></tr>` : ''}
    </table>
  </div>`;

  // ── Email 2: Confirmation to the client ──
  const clientHtml = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0b0f1c;color:#EDE8DF;padding:2.5rem;border:1px solid #C8A96E;">
    <div style="text-align:center;margin-bottom:2rem;">
      <h1 style="font-family:Georgia,serif;color:#C8A96E;font-size:1.8rem;font-weight:400;margin:0;">FACETECH 2026</h1>
      <p style="color:#9a9088;font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;margin-top:0.3rem;">Cirug&iacute;a &middot; Tecnolog&iacute;a &middot; Funci&oacute;n</p>
    </div>

    <p style="font-size:1rem;color:#EDE8DF;margin-bottom:0.5rem;">&iexcl;Hola <strong>${nombre.split(' ')[0]}</strong>!</p>

    <p style="font-size:0.9rem;color:#9a9088;line-height:1.8;margin-bottom:1.5rem;">
      Hemos recibido tu solicitud de inscripci&oacute;n al <strong style="color:#EDE8DF;">Congreso Internacional de Cirug&iacute;a Facial Integrada &mdash; FACETECH 2026</strong>. Gracias por tu inter&eacute;s.
    </p>

    <div style="background:rgba(200,169,110,0.06);border:1px solid rgba(200,169,110,0.2);padding:1.2rem;margin-bottom:1.5rem;">
      <p style="font-size:0.65rem;color:#9a9088;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 0.6rem;">Resumen de tu solicitud</p>
      <p style="color:#EDE8DF;font-size:0.9rem;margin:0.3rem 0;"><strong>Paquete:</strong> ${paquete}</p>
      <p style="color:#EDE8DF;font-size:0.9rem;margin:0.3rem 0;"><strong>Fecha:</strong> 5 &ndash; 8 de agosto de 2026</p>
      <p style="color:#EDE8DF;font-size:0.9rem;margin:0.3rem 0;"><strong>Modalidad:</strong> Presencial</p>
    </div>

    <p style="font-size:0.9rem;color:#9a9088;line-height:1.8;margin-bottom:1.5rem;">
      Nuestro equipo se pondr&aacute; en contacto contigo en las pr&oacute;ximas <strong style="color:#EDE8DF;">24&ndash;48 horas</strong> para confirmar los detalles de tu registro y proceso de pago.
    </p>

    <p style="font-size:0.9rem;color:#9a9088;line-height:1.8;margin-bottom:2rem;">
      Si tienes alguna pregunta mientras tanto, escr&iacute;benos a <a href="mailto:info@facetech2026.com" style="color:#C8A96E;text-decoration:none;">info@facetech2026.com</a>
    </p>

    <div style="border-top:1px solid #5c4a2a;padding-top:1.2rem;text-align:center;">
      <p style="color:#5c4a2a;font-size:0.7rem;letter-spacing:0.1em;">&copy; 2026 FACETECH &middot; Cirug&iacute;a &middot; Tecnolog&iacute;a &middot; Funci&oacute;n &middot; Un Solo Rostro</p>
    </div>
  </div>`;

  try {
    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail({
        from: '"FACETECH 2026" <' + process.env.SMTP_USER + '>',
        to: process.env.SMTP_USER,
        subject: `Nueva inscripción: ${nombre} — ${paquete}`,
        html: teamHtml
      }),
      transporter.sendMail({
        from: '"FACETECH 2026" <' + process.env.SMTP_USER + '>',
        to: email,
        replyTo: process.env.SMTP_USER,
        subject: '¡Gracias por tu inscripción! — FACETECH 2026',
        html: clientHtml
      })
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Error enviando email' });
  }
};
