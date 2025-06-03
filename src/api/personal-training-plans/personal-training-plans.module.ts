import { Module } from '@nestjs/common';
import { PersonalTrainingPlansService } from './personal-training-plans.service';
import { PersonalTrainingPlansController } from './personal-training-plans.controller';
import { PrismaModule } from '../../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PersonalTrainingPlansController],
  providers: [PersonalTrainingPlansService],
})
export class PersonalTrainingPlansModule {}
