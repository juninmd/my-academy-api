import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutDto {
  @ApiProperty({ required: true })
  exerciseId: number;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  workoutsGroupsId: number;
}
