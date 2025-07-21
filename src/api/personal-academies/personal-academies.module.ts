import { Module } from '@nestjs/common';
import { PersonalAcademiesService } from './personal-academies.service';
import { PersonalAcademiesController } from './personal-academies.controller';
import { PrismaModule } from '../../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PersonalAcademiesController],
  providers: [PersonalAcademiesService],
})
export class PersonalAcademiesModule {}
