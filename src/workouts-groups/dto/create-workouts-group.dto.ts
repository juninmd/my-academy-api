import { ApiProperty } from '@nestjs/swagger';
import { CreateWorkoutDto } from '../../workouts/dto/create-workout.dto';

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
  @ApiProperty({ required: true })
  userId: number;
  @ApiProperty({ required: true })
  methodId?: number;
  @ApiProperty({ required: true })
  image: string;
  @ApiProperty({ required: true })
  workouts?: CreateWorkoutDto;
}
