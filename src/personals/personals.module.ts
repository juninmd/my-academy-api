import { Module } from '@nestjs/common';
import { PersonalsService } from './personals.service';
import { PersonalsController } from './personals.controller';

@Module({
  controllers: [PersonalsController],
  providers: [PersonalsService]
})
export class PersonalsModule {}
