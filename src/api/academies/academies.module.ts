import { Module } from '@nestjs/common';
import { AcademiesService } from './academies.service';
import { AcademiesController } from './academies.controller';
import { PrismaModule } from '../../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AcademiesController],
  providers: [AcademiesService],
})
export class AcademiesModule {}
