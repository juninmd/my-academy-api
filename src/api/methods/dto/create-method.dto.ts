import { ApiProperty } from '@nestjs/swagger';

export class CreateMethodDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  description: string;
}
