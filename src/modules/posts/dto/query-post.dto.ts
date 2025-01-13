import { IsNotEmpty } from 'class-validator';
import { ListParamsDto } from 'src/modules/common/dto/list-params.dto';

export class QueryPostDto extends ListParamsDto {
  @IsNotEmpty()
  search: string;
}
