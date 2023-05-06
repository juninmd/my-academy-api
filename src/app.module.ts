import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './exercises/exercises.module';
import { ExercisesSeriesModule } from './exercises-series/exercises-series.module';
import { MethodsModule } from './methods/methods.module';
import { PersonalsModule } from './personals/personals.module';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { WorkoutsCategoriesModule } from './workouts-categories/workouts-categories.module';
import { WorkoutsGroupsModule } from './workouts-groups/workouts-groups.module';
import { WorkoutsHistoryModule } from './workouts-history/workouts-history.module';

@Module({
  imports: [ExercisesModule, ExercisesSeriesModule, MethodsModule, PersonalsModule, UsersModule, WorkoutsModule, WorkoutsCategoriesModule, WorkoutsGroupsModule, WorkoutsHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
