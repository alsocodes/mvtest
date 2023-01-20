import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email format is not valid' })
  email: string;

  @IsNotEmpty({ message: 'Photo is required' })
  photo: string;
}
