import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutsGroupDto {
  @ApiProperty({ required: true, description: 'Treino' })
  name: string;
  @ApiProperty({ required: true })
  description: string;
  @ApiProperty({ required: true })
  dateStart: Date;
  @ApiProperty({ required: true })
  dateEnd: Date;
  @ApiProperty({ required: true })
  level: number;
}
