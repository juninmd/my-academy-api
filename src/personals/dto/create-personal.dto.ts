import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonalDto {
  @ApiProperty({ required: true })
  id: number;
  @ApiProperty({ required: true })
  userId: string;
}
