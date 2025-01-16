import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MailerService } from 'src/mailer/mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  // @Post('reset-password')
  // async sendResetPasswordEmail(
  //   @Body('to') to: string,
  //   @Body('link') link: string,
  // ) {
  //   await this.mailerService.resetPasswordEmail(to, link);
  //   return { message: 'Correo de restablecimiento enviado' };
  // }

  @ApiOperation({ summary: 'Enviar correo de bienvenida a un nuevo usuario' })
  @ApiBody({
    description: 'Datos necesarios para enviar el correo de bienvenida',
    schema: {
      type: 'object',
      properties: {
        to: { type: 'string', example: 'user@example.com' },
        userName: { type: 'string', example: 'John Doe' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Correo de bienvenida enviado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post('welcome')
  async sendWelcomeEmail(
    @Body('to') to: string,
    @Body('userName') userName: string,
  ) {
    await this.mailerService.mailWelcome(to, userName);
    return { message: 'Correo de bienvenida enviado' };
  }

  // @Post('test')
  // async sendTestNotification(@Body('email') email: string) {
  //   await this.mailerService.sendTestNotification(email);
  //   return { message: 'Correo de prueba enviado' };
  // }
}
