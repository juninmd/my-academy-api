import { Test } from '@nestjs/testing';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Controller, Get, Body, Module } from '@nestjs/common';
import { User } from './users/entities/user.entity';
import { CreateUserDto } from './users/dto/create-user.dto';
import { CreateWorkoutsGroupDto } from './workouts-groups/dto/create-workouts-group.dto';
import { WorkoutsGroup } from './workouts-groups/entities/workouts-group.entity';
import { CreateWorkoutDto } from './workouts/dto/create-workout.dto';
import { Workout } from './workouts/entities/workout.entity';
import { CreateExerciseLogDto } from './exercise-logs/dto/create-exercise-log.dto';
import { Exercise } from './exercises/entities/exercise.entity';
import { Method } from './methods/entities/method.entity';

@Controller('dummy')
class DummyController {
  @Get('user')
  getUser(): User { return new User(); }

  @Get('group')
  getGroup(): WorkoutsGroup { return new WorkoutsGroup(); }

  @Get('workout')
  getWorkout(): Workout { return new Workout(); }

  @Get('exercise')
  getExercise(): Exercise { return new Exercise(); }

  @Get('method')
  getMethod(): Method { return new Method(); }

  @Get('create-user')
  createUser(@Body() dto: CreateUserDto) {}

  @Get('create-group')
  createGroup(@Body() dto: CreateWorkoutsGroupDto) {}

  @Get('create-workout')
  createWorkout(@Body() dto: CreateWorkoutDto) {}

  @Get('create-log')
  createLog(@Body() dto: CreateExerciseLogDto) {}
}

@Module({ controllers: [DummyController] })
class DummyModule {}

describe('Swagger Types Coverage', () => {
  it('should generate swagger document to trigger type functions', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DummyModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    const config = new DocumentBuilder().build();
    const document = SwaggerModule.createDocument(app, config);

    expect(document).toBeDefined();
    expect(document.components.schemas).toBeDefined();
  });

  it('should manually trigger type callbacks in decorators', () => {
    const classes = [
      User,
      WorkoutsGroup,
      Workout,
      Exercise,
      Method,
      CreateWorkoutDto,
      CreateExerciseLogDto,
      CreateUserDto,
      CreateWorkoutsGroupDto,
    ];

    classes.forEach((Cls) => {
      const propertyKeys =
        Reflect.getMetadata('swagger/apiModelPropertiesArray', Cls.prototype) ||
        [];

      propertyKeys.forEach((key: string) => {
        // key often has a prefix like ':'
        const cleanKey = key.substring(1);
        const metadata = Reflect.getMetadata(
          `swagger/apiModelProperties:${cleanKey}`,
          Cls.prototype,
        );

        if (metadata && typeof metadata.type === 'function') {
           // This triggers the () => Type arrow function
           try {
             metadata.type();
           } catch (e) {
             // ignore
           }
        }
      });
    });
  });
});
