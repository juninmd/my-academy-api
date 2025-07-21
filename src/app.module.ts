import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './api/exercises/exercises.module';
import { WorkoutsSeriesModule } from './api/workouts-series/workouts-series.module';
import { MethodsModule } from './api/methods/methods.module';
import { PersonalsModule } from './api/personals/personals.module';
import { UsersModule } from './api/users/users.module';
import { WorkoutsModule } from './api/workouts/workouts.module';
import { WorkoutsGroupsModule } from './api/workouts-groups/workouts-groups.module';
import { WorkoutsSessionsModule } from './api/workouts-sessions/workouts-sessions.module';
import { WorkoutsBlocksModule } from './api/workouts-blocks/workouts-blocks.module'; // Importa o novo módulo
import { PreauthMiddleware } from './api/auth/firebase.auth';
import { HealthModule } from './api/health/health.module';
import { TelegramModule } from './api/telegram/telegram.module';
import { PhysicalAssessmentsModule } from './api/physical-assessments/physical-assessments.module';
import { NotificationsModule } from './api/notifications/notifications.module';
import { ClassBookingsModule } from './api/class-bookings/class-bookings.module';
import { FirebaseModule } from './api/firebase/firebase.module';
import { AuthModule } from './api/auth/auth.module';
import { SubscriptionsModule } from './api/subscriptions/subscriptions.module';
import { PhysicalAssessmentSchedulesModule } from './api/physical-assessment-schedules/physical-assessment-schedules.module';
import { PersonalTrainingPlansModule } from './api/personal-training-plans/personal-training-plans.module';
import { AcademiesModule } from './api/academies/academies.module';
import { PersonalAcademiesModule } from './api/personal-academies/personal-academies.module';
import { StudentAcademiesModule } from './api/student-academies/student-academies.module';

@Module({
  imports: [
    AuthModule,
    FirebaseModule,
    ExercisesModule,
    WorkoutsSeriesModule,
    MethodsModule,
    PersonalsModule,
    UsersModule,
    WorkoutsModule,
    WorkoutsSessionsModule,
    WorkoutsGroupsModule,
    WorkoutsBlocksModule,
    HealthModule,
    TelegramModule,
    PhysicalAssessmentsModule,
    NotificationsModule,
    ClassBookingsModule,
    SubscriptionsModule,
    PhysicalAssessmentSchedulesModule,
    PersonalTrainingPlansModule, // Adiciona o novo módulo de planos de treino personal
    AcademiesModule,
    PersonalAcademiesModule,
    StudentAcademiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    if (process.env.FIREBASE_ENABLED === 'true') {
      consumer.apply(PreauthMiddleware).forRoutes({
        path: '*', method: RequestMethod.ALL
      });
    }
  }
}
