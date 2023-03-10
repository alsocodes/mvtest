import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { AuthService } from './auth.service';
import { PublicRoute } from './constants';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { LoginToken } from './type/login-token.type';

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
  login(@Request() req) {
    const { id, username } = req.user;
    const payload: LoginToken = {
      sub: id,
      username: username,
    };
    const token = this.authService.loginToken(payload);

    return {
      success: true,
      message: 'Successfully logged in',
      data: {
        token,
      },
    };
  }

  @Post('logout')
  async logout() {
    return {
      success: true,
      message: 'Successfully logout',
      data: null,
    };
  }

  @PublicRoute()
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/',
        filename(req, file, callback) {
          callback(null, `${Date.now()}.png`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }), //1MB
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const dirUploads = path.join(__dirname, '../../uploads');
    const filepath = `${dirUploads}/${file.filename}`;
    const renamefile = `${Date.now()}.png`;
    await sharp(filepath)
      .resize(300, 300)
      .png({ effort: 3, quality: 100 })
      .toFile(`${dirUploads}/${renamefile}`);

    fs.unlinkSync(filepath);

    const apiUrl = process.env.API_URL || 'http://localhost:9001';
    return {
      succes: true,
      message: 'File succesfully uploaded',
      data: {
        link: `${apiUrl}/uploads/${renamefile}`,
      },
    };
  }
}
