import { PartialType } from '@nestjs/mapped-types';
import { ListParamsDto } from 'src/modules/common/dto/list-params.dto';

export class QueryPostDto extends PartialType(ListParamsDto) {}
