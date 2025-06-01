import { Module } from '@nestjs/common';
import { PhysicalAssessmentSchedulesService } from './physical-assessment-schedules.service';
import { PhysicalAssessmentSchedulesController } from './physical-assessment-schedules.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PhysicalAssessmentSchedulesController],
  providers: [PhysicalAssessmentSchedulesService],
})
export class PhysicalAssessmentSchedulesModule {}
