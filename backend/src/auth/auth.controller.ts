import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto'; // ✅ Import de SignupDto
import { LoginDto } from './dto/login.dto'; // ✅ Import de LoginDto

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) { // ✅ Utilisation de SignupDto
    return this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) { // ✅ Utilisation de LoginDto
    return this.authService.login(loginDto);
  }
}

