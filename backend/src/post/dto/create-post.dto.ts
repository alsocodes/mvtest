import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDTO {
  @IsNotEmpty({ message: 'Caption is required' })
  @ApiProperty()
  caption: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Tags is required' })
  tags: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Image is required' })
  image: string;
}
