import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { PublicRoute } from './constants';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @ApiBody({ type: RegisterDTO })
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const { id, password, createdAt, updatedAt, ...data } =
      await this.authService.register(registerDTO);
    return {
      success: true,
      message: 'Your account has been successfully created',
      data,
    };
  }

  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDTO })
  async login(@Request() req) {
    const token = await this.authService.login(req.user);

    return {
      success: true,
      message: 'Successfully logged in',
      data: {
        token,
      },
    };
  }
}
