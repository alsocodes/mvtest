import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Put,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async get(@Request() req) {
    const { id } = req.user;

    const data = await this.userService.findById(id).then((result) => {
      const { id, password, ...data } = result;
      return data;
    });
    if (!data) {
      throw new NotFoundException('Data not found');
    }
    return {
      success: true,
      message: 'Successfully Get User',
      data,
    };
  }

  @Put('/')
  @ApiOperation({ summary: 'Update User' })
  async update(@Body() updateUserDTO: UpdateUserDTO, @Request() req) {
    const { id } = req.user;

    const data = await this.userService
      .update(id, updateUserDTO)
      .then((result) => {
        const { id, password, ...data } = result;
        return data;
      });
    return {
      success: true,
      message: 'Successfully Update User',
      data,
    };
  }

  @Put('/change-password')
  async changePassword(
    @Body() changePasswordDTO: ChangePasswordDTO,
    @Request() req,
  ) {
    const { id } = req.user;

    await this.userService.changePassword(id, changePasswordDTO);

    return {
      success: true,
      message: 'Successfully Change Password',
      data: null,
    };
  }
}
