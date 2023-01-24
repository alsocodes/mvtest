import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePostDTO {
  @IsNotEmpty({ message: 'Caption is required' })
  @ApiProperty()
  caption: string;

  @IsNotEmpty({ message: 'Tags is required' })
  @ApiProperty()
  tags: string;

  @IsNotEmpty({ message: 'Image is required' })
  @ApiProperty()
  image: string;
}
