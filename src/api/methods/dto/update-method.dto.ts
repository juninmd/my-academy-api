import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMethodDto } from './create-method.dto';

export class UpdateMethodDto extends PartialType(CreateMethodDto) {
  @ApiProperty({ required: true })
  name?: string;
  @ApiProperty({ required: true })
  description?: string;
}
