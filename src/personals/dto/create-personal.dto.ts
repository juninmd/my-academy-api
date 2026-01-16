import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonalDto {
  @ApiProperty({ required: false })
  id?: number;

  @ApiProperty({ required: true })
  personalUserId: string;

  @ApiProperty({ required: true })
  studentUserId: string;
}
