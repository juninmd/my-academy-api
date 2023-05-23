import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutsSessionsDto {
  @ApiProperty({})
  readonly id: number;
  @ApiProperty({ required: true, description: 'Treino' })
  readonly workoutId: number;
  @ApiProperty({
    default: new Date().toJSON()
  })
  readonly date: Date;

  readonly Workouts: any[];
}
