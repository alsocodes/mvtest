import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangePasswordDTO {
  @IsNotEmpty({ message: 'Old Password is required' })
  oldPassword: string;

  @IsNotEmpty({ message: 'New Password is required' })
  newPassword: string;

  @IsNotEmpty({ message: 'Confirm New Password is required' })
  confirmNewPassword: string;
}
