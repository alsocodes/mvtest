import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class QueryDTO {
  page: number;

  limit: number;

  @IsOptional()
  @IsIn(['caption', 'tag'], { message: 'SearchBy should be caption or tag' })
  searchBy?: string;

  @IsOptional()
  search?: string;
}
