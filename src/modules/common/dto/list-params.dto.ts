import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ListParams } from '../utils/types/pagination';
import { Transform, Type } from 'class-transformer';

export class Pagination {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  page?: number = 1;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  limit?: number = 10;
}

export class Sorting {
  @IsString()
  @IsNotEmpty()
  arrange: 'asc' | 'desc' | 'ASC' | 'DESC';

  @IsString()
  @IsNotEmpty()
  column: string;
}

export enum FilterComparators {
  EqualTo = 'EqualTo',
  Between = 'Between',
  In = 'In',
  BooleanIn = 'BooleanIn',
  HasValue = 'HasValue',
}

export class AndCondition {
  @IsString()
  column: string;

  @IsEnum(FilterComparators)
  comparator: FilterComparators = FilterComparators.EqualTo;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  value: string[];
}

export class OrCondition {
  @ValidateNested({ each: true })
  @Type(() => AndCondition)
  andConditions: AndCondition[];
}

export class Filter {
  @ValidateNested({ each: true })
  @Type(() => OrCondition)
  orConditions: OrCondition[];
}

export class ListParamsDto implements ListParams {
  @ValidateNested()
  @IsNotEmpty()
  pagination: Pagination;

  @ValidateNested()
  sorting?: Sorting;

  @IsOptional()
  search?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Filter)
  filters?: Filter;

  @IsOptional()
  published?: boolean;
}
