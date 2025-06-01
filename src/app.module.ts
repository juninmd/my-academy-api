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
import { WorkoutsBlocksModule } from './workouts-blocks/workouts-blocks.module'; // Importa o novo módulo
import { PreauthMiddleware } from './auth/firebase.auth';
import { HealthModule } from './health/health.module';
import { TelegramModule } from './telegram/telegram.module';
import { PhysicalAssessmentsModule } from './physical-assessments/physical-assessments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ClassBookingsModule } from './class-bookings/class-bookings.module';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PhysicalAssessmentSchedulesModule } from './physical-assessment-schedules/physical-assessment-schedules.module';

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
    PhysicalAssessmentSchedulesModule, // Adiciona o novo módulo de agendamento de avaliações físicas
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
