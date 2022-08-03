import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import ObjectWithIdDto from '../../utils/types/objectWithId.dto';

class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => ObjectWithIdDto)
  category: ObjectWithIdDto;
}

export default CreateProductDto;
