import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ItamAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('/magic-link')
  sendMagicLink(@Body('email') email: string) {
    return this.authService.sendMagicLink(email)
  }

  @Get('/magic-link/verify')
  async verifyMagicLink(@Query() param, @Res() res: Response) {
    const result = await this.authService.verifyMagicLink(param.email, param.token)
    if (result) res.redirect('http://localhost:5500/home.html')
  }


  @UseGuards(ItamAuthGuard)
  @Get('/home')
  home() {
    return 'test'
  }
}



