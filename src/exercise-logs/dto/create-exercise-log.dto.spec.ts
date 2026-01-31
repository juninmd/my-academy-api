import { plainToInstance } from 'class-transformer';
import {
  CreateExerciseLogDto,
  CreateSetLogDto,
} from './create-exercise-log.dto';

describe('CreateExerciseLogDto', () => {
  it('should transform nested sets correctly', () => {
    const plain = {
      userId: 'user1',
      exerciseId: 1,
      date: new Date().toISOString(),
      sets: [
        {
          reps: 10,
          weight: 20,
        },
      ],
    };

    const instance = plainToInstance(CreateExerciseLogDto, plain);

    expect(instance).toBeInstanceOf(CreateExerciseLogDto);
    expect(instance.sets).toBeDefined();
    expect(instance.sets![0]).toBeInstanceOf(CreateSetLogDto);
    expect(instance.sets![0].reps).toBe(10);
  });
});
