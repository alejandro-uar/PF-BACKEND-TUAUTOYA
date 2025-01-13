import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host : process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.STMP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    /**
     * Enviar Correo del destinatario
     * @param to Correo del destinatario
     * @param link Enlace para restablecer la contraseña
     */
    async resetPasswordEmail(to: string, link: string){
        const mailOptions = {
            from: `"TuaAutoYA <${process.env.SMTP_USER}>`,
            to,
            subject: 'Recuperacion de Contraseña',
            text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${link}`,
            html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${link}">Restablecer Contraseña</a>`,
        }

        await this.transporter.sendMail(mailOptions);
    }

    /**
     * Enviar correo de confirmacion.
     * @param to Correo del destinatario
     * @param type Tipo de confirmacion (registero, orden, etc.) 
     */
    async mailConfirm(to: string, type: string){
        const mailOptions = {
            from: `"TuAutoYA" <${process.env.SMTP_USER}>`,
            to,
            subject: `Confirmacion de ${type}`,
            text: `Tu ${type} ha sido confirmada!</p>`,
        };

        await this.transporter.sendMail(mailOptions);
    }

    /**
     * Enviar correo de notificaion de cuenta bloqueada.
     * @param reason Razon del bloqueo
     * @param to Correo del destinatario
     */
    async mailBanUser(reason: string, to: string){
        const mailOptions = {
            from: `"TuAutoYA" <${process.env.SMTP_USER}>`,
            to,
            subject: `Notificacion de bloqueo de Cuenta`,
            text: reason,
            html: `<p>${reason}</p>`,
        };
        await this. transporter.sendMail(mailOptions);
    }

    /**
     * Enviar correo de bienvenida.
     * @param to Correo del destinatario
     * @param userName Nombre del usuario
     */
    async mailWelcome(to: string, userName: string){
        const emailContent = `
        <div>
            <h2>¡Bienvenido a TuAutoYA, ${userName}!</h2>
            <p>Gracias por unirte a nuestro sistema de alquiler de vehiculos.</p>
            <p>Encuentra el auto perfecto para tus necesidades y disfruta de la experiencia mas sencilla para rentar.</p>
            <p>Empieza ahora: <a href="">Inicia sesion aqui</a>.</p>
            <p> Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <br>
            <p>Atentamente,</p>
            <p><strong>El equipo de TuAutoYA</strong></p>
        </div>
        `;

        const mailOptions = {
            from: `"TuAutoYA" <${process.env.SMTP_USER}>`,
            to,
            subject: '¡Bienvenido a TuAutoYA!',
            html: emailContent,
        };
        await this.transporter.sendMail(mailOptions);
    }

    /**
   * Enviar correo de cancelación de pago.
   * @param to Correo del destinatario
   */
  async mailPaymentCancel(to: string) {
    const mailOptions = {
      from: `"TuAutoYA" <${process.env.SMTP_USER}>`,
      to,
      subject: `Pago Cancelado o Rechazado`,
      text: `Tu pago fue cancelado o rechazado. Por favor, intenta nuevamente.`,
      html: `<p>Tu pago fue cancelado o rechazado. Por favor, intenta nuevamente.</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }

/**
 * Enviar una notificación básica de prueba.
 * @param to Correo del destinatario
 */
async sendTestNotification(to: string) {
    const mailOptions = {
      from: `"TuAutoYA" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Correo de prueba',
      text: 'Este es un correo de prueba desde el sistema TuAutoYA.',
      html: `<p>Este es un correo de prueba desde el sistema <strong>TuAutoYA</strong>.</p>`,
    };
  
    await this.transporter.sendMail(mailOptions);
    }
}