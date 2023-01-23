import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginToken } from './type/login-token.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  register(registerDTO: RegisterDTO) {
    return this.userService.create(registerDTO);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new UnauthorizedException('Username not found');
    const match = await bcrypt.compare(pass, user.password);
    if (!match) throw new UnauthorizedException('Invalid password');
    const { password, ...result } = user;
    return result;
  }

  loginToken(payload: LoginToken) {
    if (!payload) throw new Error();

    const access_token_expires =
      process.env.ACCESS_TOKEN_EXPIRES_IN || 'secret_key';
    const access_token_secret = process.env.ACCESS_TOKEN_SECRET_KEY || '900s';

    return this.jwtService.sign(
      {
        ...payload,
      },
      {
        secret: access_token_secret,
        expiresIn: access_token_expires,
      },
    );
  }
}
