import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutsPersonalsSessionDto {
  @ApiProperty({ required: true })
  date: Date;

  @ApiProperty({ required: true })
  personalsId: number;

  @ApiProperty({ required: true })
  userId: number;

  @ApiProperty({ required: true })
  observation: string;
}
