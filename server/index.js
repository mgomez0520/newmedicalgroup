const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta raíz del proyecto
app.use(express.static(path.join(__dirname, '..')));

// Envío real del formulario: prefer SendGrid si está configurado, sino SMTP (nodemailer)
const sendEmail = async ({ name, contact, message }) => {
  if(process.env.SENDGRID_API_KEY){
    // SendGrid
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: process.env.CONTACT_TO_EMAIL || 'info@newmedicalgroup.example',
      from: process.env.EMAIL_FROM || 'no-reply@newmedicalgroup.com.co',
      subject: `Nuevo contacto: ${name}`,
      text: `Nombre: ${name}\nContacto: ${contact}\nMensaje: ${message}`,
    };
    await sgMail.send(msg);
    return { ok: true, provider: 'sendgrid' };
  }

  if(process.env.SMTP_HOST){
    // SMTP via nodemailer
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT,10) : 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    });
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'no-reply@newmedicalgroup.com.co',
      to: process.env.CONTACT_TO_EMAIL || 'info@newmedicalgroup.example',
      subject: `Nuevo contacto: ${name}`,
      text: `Nombre: ${name}\nContacto: ${contact}\nMensaje: ${message}`,
    });
    return { ok: true, provider: 'smtp', info };
  }

  // Si no hay proveedor configurado, solo loggear
  console.log('Contacto recibido (no enviado):', { name, contact, message });
  return { ok: true, provider: 'log' };
};

app.post('/api/contact', async (req, res) => {
  try{
    const { name, contact, message } = req.body || {};
    if(!name || !contact) return res.status(400).json({ ok: false, message: 'Faltan campos requeridos' });
    const result = await sendEmail({ name, contact, message });
    return res.json({ ok: true, message: 'Solicitud recibida', provider: result.provider });
  }catch(err){
    console.error('Error enviando contacto:', err);
    return res.status(500).json({ ok: false, message: 'Error interno' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de desarrollo escuchando en http://localhost:${PORT}`);
});
