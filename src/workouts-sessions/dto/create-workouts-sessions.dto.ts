import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutsSessionsDto {
  @ApiProperty({})
  readonly id?: number;
  @ApiProperty({ required: true, description: 'Treino' })
  readonly workoutGroupId: number;
  @ApiProperty({
    type: Date,
    default: new Date(),
  })
  readonly date: Date;

  readonly Workouts: any[];
}
