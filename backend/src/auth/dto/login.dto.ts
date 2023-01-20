import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsNotEmpty({ message: 'Photo is required' })
  photo: string;
}
