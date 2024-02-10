import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutsSeriesModule } from './workouts-series/workouts-series.module';
import { MethodsModule } from './methods/methods.module';
import { PersonalsModule } from './personals/personals.module';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { WorkoutsGroupsModule } from './workouts-groups/workouts-groups.module';
import { WorkoutsSessionsModule } from './workouts-sessions/workouts-sessions.module';
import { StudentsModule } from './students/students.module';
import { WorkoutsPersonalsSessionsModule } from './workouts-personals-sessions/workouts-personals-sessions.module';
import { CacheModule } from '@nestjs/cache-manager';
import { PreauthMiddleware } from './auth/firebase.auth';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ExercisesModule,
    WorkoutsSeriesModule,
    MethodsModule,
    PersonalsModule,
    UsersModule,
    WorkoutsModule,
    WorkoutsSessionsModule,
    WorkoutsGroupsModule,
    StudentsModule,
    WorkoutsPersonalsSessionsModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware).forRoutes({
      path: '*', method: RequestMethod.ALL
    });
  }
}
