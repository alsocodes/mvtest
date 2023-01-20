import { IsNotEmpty } from 'class-validator';

export class CreatePostDTO {
  @IsNotEmpty({ message: 'Caption is required' })
  caption: string;

  @IsNotEmpty({ message: 'Tags is required' })
  tags: string;

  @IsNotEmpty({ message: 'Image is required' })
  image: string;
}
