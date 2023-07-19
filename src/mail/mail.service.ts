import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  async sendEmail(email: string, token: string): Promise<boolean> {

    try {
      await this.mailerService
        .sendMail({
          to: email,
          from: 'whdgjs00@gmail.com',
          subject: 'Hello',
          html: `
                  <h2>Confirm your signup</h2>
                  <p>Click <a href="http://localhost:3000/auth/magic-link/verify?token=${token}&email=${email}">here</a> to confirm your signup</p>
          `,
        })
      return true;
    } catch (err) {
      console.log(err)
    }

  }
}