import { Module } from '@nestjs/common';
import { StudentAcademiesService } from './student-academies.service';
import { StudentAcademiesController } from './student-academies.controller';
import { PrismaModule } from '../../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StudentAcademiesController],
  providers: [StudentAcademiesService],
})
export class StudentAcademiesModule {}
