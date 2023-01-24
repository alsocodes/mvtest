import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class QueryDTO {
  @IsNotEmpty({ message: 'Page is required' })
  // @IsNumber({}, { message: 'Page must a number' })
  @ApiProperty()
  page: number;

  @IsNotEmpty({ message: 'Limit is required' })
  // @IsNumber({}, { message: 'Limit must a number' })
  @ApiProperty()
  limit: number;

  @IsOptional()
  @IsIn(['caption', 'tag'], { message: 'SearchBy should be caption or tag' })
  searchBy?: string;

  // @ApiProperty()
  @IsOptional()
  search?: string;
}
