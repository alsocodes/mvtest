import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'Username is required' })
  @ApiProperty()
  username: string;

  @IsNotEmpty({ message: 'Photo is required' })
  @ApiProperty()
  photo: string;
}
