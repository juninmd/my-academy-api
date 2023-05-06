import { Module } from '@nestjs/common';
import { PersonalsService } from './personals.service';
import { PersonalsController } from './personals.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PersonalsController],
  providers: [PersonalsService, PrismaService]
})
export class PersonalsModule {}
