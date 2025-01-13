import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('reset-password')
  async sendResetPasswordEmail(
    @Body('to') to: string,
    @Body('link') link: string,
  ) {
    await this.mailerService.resetPasswordEmail(to, link);
    return { message: 'Correo de restablecimiento enviado' };
  }

  @Post('welcome')
  async sendWelcomeEmail(
    @Body('to') to: string,
    @Body('userName') userName: string,
  ) {
    await this.mailerService.mailWelcome(to, userName);
    return { message: 'Correo de bienvenida enviado' };
  }

  @Post('test')
  async sendTestNotification(@Body('email') email: string) {
    await this.mailerService.sendTestNotification(email);
    return { message: 'Correo de prueba enviado' };
  }
}
