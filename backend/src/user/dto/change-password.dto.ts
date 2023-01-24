import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangePasswordDTO {
  @IsNotEmpty({ message: 'Old Password is required' })
  @ApiProperty()
  oldPassword: string;

  @IsNotEmpty({ message: 'New Password is required' })
  @ApiProperty()
  newPassword: string;

  @IsNotEmpty({ message: 'Confirm New Password is required' })
  @ApiProperty()
  confirmNewPassword: string;
}
