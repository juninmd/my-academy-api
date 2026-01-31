import { plainToInstance } from 'class-transformer';
import { CreateWorkoutsGroupDto } from './create-workouts-group.dto';
import { CreateWorkoutNestedDto } from '../../workouts/dto/create-workout-nested.dto';
import { CreateWorkoutSeriesNestedDto } from '../../workouts-series/dto/create-workout-series-nested.dto';

describe('CreateWorkoutsGroupDto', () => {
  it('should transform nested workouts and series correctly', () => {
    const plain = {
      name: 'Test Group',
      image: 'image.jpg',
      userId: 'user1',
      workouts: [
        {
          exerciseId: 1,
          description: 'desc',
          workoutsGroupsId: 10,
          methodId: 2,
          workoutSeries: [
            {
              repetitions: 12,
              weight: 50,
            },
          ],
        },
      ],
    };

    const instance = plainToInstance(CreateWorkoutsGroupDto, plain);

    expect(instance).toBeInstanceOf(CreateWorkoutsGroupDto);
    expect(instance.workouts).toBeDefined();
    expect(instance.workouts![0]).toBeInstanceOf(CreateWorkoutNestedDto);
    expect(instance.workouts![0].exerciseId).toBe(1);

    // Check nested series transformation
    expect(instance.workouts![0].workoutSeries).toBeDefined();
    expect(instance.workouts![0].workoutSeries![0]).toBeInstanceOf(
      CreateWorkoutSeriesNestedDto,
    );
    expect(instance.workouts![0].workoutSeries![0].repetitions).toBe(12);
  });
});
