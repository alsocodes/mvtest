import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: 'Username is required' })
  @ApiProperty()
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email format is not valid' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'Photo is required' })
  @ApiProperty()
  photo: string;
}
