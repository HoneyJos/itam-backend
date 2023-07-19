import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { send } from 'process';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis()
    private readonly client: Redis,
    private readonly mailService: MailService

  ) { }
  // send magic link to user's email
  async sendMagicLink(email: string) {
    // generate token with email
    const generateToken = () => {
      const token = Math.random().toString(36).slice(2);
      return token;
    }
    const token = generateToken();
    // save token to redis && send email
    try {
      const result = await this.client.set(email, token, 'EX', 60);
      const sendEmail = await this.mailService.sendEmail(email, token)
      if (sendEmail) {
        return email;
      }
    } catch (err) {
      console.log(err)
    }

  }

  // verify magic link
  async verifyMagicLink(email: string, token: string) {
    // check token from redis
    const redisToken = await this.client.get(email);
    if (redisToken === token) {
      return true;
    }
    return false;
  }
}
