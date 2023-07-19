import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('notebook')
export class NotebookController {
  @Post('/')
  notebooks(@Body('email') email: object) {
    const userEmail = email;
    return userEmail;
  }
}
