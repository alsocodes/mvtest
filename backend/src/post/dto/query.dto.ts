import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class QueryDTO {
  @IsNotEmpty({ message: 'Page is required' })
  // @IsNumber({}, { message: 'Page must a number' })
  page: number;

  @IsNotEmpty({ message: 'Limit is required' })
  // @IsNumber({}, { message: 'Limit must a number' })
  limit: number;

  @IsOptional()
  @IsIn(['caption', 'tag'], { message: 'SearchBy should be caption or tag' })
  searchBy?: string;

  @IsOptional()
  search?: string;
}
