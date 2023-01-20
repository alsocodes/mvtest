import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorHandling } from 'src/utils/error-handling';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';

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

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({
        data: { email, name, photo, username, password: passwordHash },
      });

      return user;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async update(id: number, updateUserDTO: UpdateUserDTO) {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new NotFoundException('Data not found');
      }

      const { name, email, photo, username } = updateUserDTO;
      const update = await this.prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          photo,
          username,
        },
      });

      return update;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async changePassword(id: number, changePasswordDTO: ChangePasswordDTO) {
    try {
      const { oldPassword, newPassword, confirmNewPassword } =
        changePasswordDTO;
      if (newPassword !== confirmNewPassword) {
        throw new BadRequestException('Password not match');
      }

      const user = await this.findById(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const checkOld = await bcrypt.compare(oldPassword, user.password);
      if (!checkOld) {
        throw new NotFoundException('Password not found');
      }

      const hashNewPassword = await bcrypt.hash(newPassword, 10);
      await this.prisma.user.update({
        where: { id },
        data: { password: hashNewPassword },
      });
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
