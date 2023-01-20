import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorHandling } from 'src/utils/error-handling';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  findByUsername(username: string) {
    return this.prisma.user.findFirst({ where: { username } });
  }

  async create(registerDTO: RegisterDTO) {
    try {
      const { email, name, password, photo, username } = registerDTO;

      const checkEmail = await this.findByEmail(email);
      if (checkEmail) throw new ConflictException('Email is already in used');

      const checkUsername = await this.findByEmail(username);
      if (checkUsername)
        throw new ConflictException('Username is already in used');

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({
        data: { email, name, photo, username, password: passwordHash },
      });

      return user;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async update() {}

  async findById(id: number) {}
}
