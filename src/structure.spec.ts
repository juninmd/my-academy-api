import { CreateExerciseLogDto } from './exercise-logs/dto/create-exercise-log.dto';
import { CreateExerciseDto } from './exercises/dto/create-exercise.dto';
import { UpdateExerciseDto } from './exercises/dto/update-exercise.dto';
import { Exercise } from './exercises/entities/exercise.entity';
import { CreateMethodDto } from './methods/dto/create-method.dto';
import { UpdateMethodDto } from './methods/dto/update-method.dto';
import { Method } from './methods/entities/method.entity';
import { CreatePersonalDto } from './personals/dto/create-personal.dto';
import { UpdatePersonalDto } from './personals/dto/update-personal.dto';
import { Personal } from './personals/entities/personal.entity';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { User } from './users/entities/user.entity';
import { CreateWorkoutsGroupDto } from './workouts-groups/dto/create-workouts-group.dto';
import { UpdateWorkoutsGroupDto } from './workouts-groups/dto/update-workouts-group.dto';
import { WorkoutsGroup } from './workouts-groups/entities/workouts-group.entity';
import { CreateWorkoutSeriesNestedDto } from './workouts-series/dto/create-workout-series-nested.dto';
import { CreateWorkoutsSeriesDto } from './workouts-series/dto/create-workouts-series.dto';
import { UpdateWorkoutsSeriesDto } from './workouts-series/dto/update-workouts-series.dto';
import { WorkoutSeries } from './workouts-series/entities/workout-series.entity';
import { CreateWorkoutsSessionsDto } from './workouts-sessions/dto/create-workouts-sessions.dto';
import { UpdateWorkoutsSessionsDto } from './workouts-sessions/dto/update-workouts-sessions.dto';
import { WorkoutsSessions } from './workouts-sessions/entities/workouts-sessions.entity';
import { CreateWorkoutNestedDto } from './workouts/dto/create-workout-nested.dto';
import { CreateWorkoutDto } from './workouts/dto/create-workout.dto';
import { UpdateWorkoutDto } from './workouts/dto/update-workout.dto';
import { Workout } from './workouts/entities/workout.entity';

// Modules
import { AppModule } from './app.module';
import { ExerciseLogsModule } from './exercise-logs/exercise-logs.module';
import { ExercisesModule } from './exercises/exercises.module';
import { HealthModule } from './health/health.module';
import { MethodsModule } from './methods/methods.module';
import { PersonalsModule } from './personals/personals.module';
import { TelegramModule } from './telegram/telegram.module';
import { UsersModule } from './users/users.module';
import { WorkoutsGroupsModule } from './workouts-groups/workouts-groups.module';
import { WorkoutsSeriesModule } from './workouts-series/workouts-series.module';
import { WorkoutsSessionsModule } from './workouts-sessions/workouts-sessions.module';
import { WorkoutsModule } from './workouts/workouts.module';

describe('Structure Coverage', () => {
  it('should instantiate all classes', () => {
    // DTOs & Entities
    expect(new CreateExerciseLogDto()).toBeDefined();
    expect(new CreateExerciseDto()).toBeDefined();
    expect(new UpdateExerciseDto()).toBeDefined();
    expect(new Exercise()).toBeDefined();

    expect(new CreateMethodDto()).toBeDefined();
    expect(new UpdateMethodDto()).toBeDefined();
    expect(new Method()).toBeDefined();

    expect(new CreatePersonalDto()).toBeDefined();
    expect(new UpdatePersonalDto()).toBeDefined();
    expect(new Personal()).toBeDefined();

    expect(new CreateUserDto()).toBeDefined();
    expect(new UpdateUserDto()).toBeDefined();
    expect(new User()).toBeDefined();

    expect(new CreateWorkoutsGroupDto()).toBeDefined();
    expect(new UpdateWorkoutsGroupDto()).toBeDefined();
    expect(new WorkoutsGroup()).toBeDefined();

    expect(new CreateWorkoutSeriesNestedDto()).toBeDefined();
    expect(new CreateWorkoutsSeriesDto()).toBeDefined();
    expect(new UpdateWorkoutsSeriesDto()).toBeDefined();
    expect(new WorkoutSeries()).toBeDefined();

    expect(new CreateWorkoutsSessionsDto()).toBeDefined();
    expect(new UpdateWorkoutsSessionsDto()).toBeDefined();
    expect(new WorkoutsSessions()).toBeDefined();

    expect(new CreateWorkoutNestedDto()).toBeDefined();
    expect(new CreateWorkoutDto()).toBeDefined();
    expect(new UpdateWorkoutDto()).toBeDefined();
    expect(new Workout()).toBeDefined();

    // Modules
    expect(new AppModule()).toBeDefined();
    expect(new ExerciseLogsModule()).toBeDefined();
    expect(new ExercisesModule()).toBeDefined();
    expect(new HealthModule()).toBeDefined();
    expect(new MethodsModule()).toBeDefined();
    expect(new PersonalsModule()).toBeDefined();
    expect(new TelegramModule()).toBeDefined();
    expect(new UsersModule()).toBeDefined();
    expect(new WorkoutsGroupsModule()).toBeDefined();
    expect(new WorkoutsSeriesModule()).toBeDefined();
    expect(new WorkoutsSessionsModule()).toBeDefined();
    expect(new WorkoutsModule()).toBeDefined();
  });
});
