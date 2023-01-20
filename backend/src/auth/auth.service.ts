import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

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
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const token = await this.generateToken({
      username: user.username,
      sub: user.id,
    });

    return token;
  }

  async generateToken(data: any) {
    const { access_token_expires, access_token_secret } = jwtConstants;

    return this.jwtService.sign(
      {
        ...data,
      },
      {
        secret: access_token_secret,
        expiresIn: access_token_expires,
      },
    );
  }
}
