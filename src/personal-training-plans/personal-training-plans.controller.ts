import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonalTrainingPlansService } from './personal-training-plans.service';
import { CreatePersonalTrainingPlanDto } from './dto/create-personal-training-plan.dto';
import { UpdatePersonalTrainingPlanDto } from './dto/update-personal-training-plan.dto';

@Controller('personal-training-plans')
export class PersonalTrainingPlansController {
  constructor(private readonly personalTrainingPlansService: PersonalTrainingPlansService) { }

  @Post()
  create(@Body() createPersonalTrainingPlanDto: CreatePersonalTrainingPlanDto) {
    return this.personalTrainingPlansService.create(createPersonalTrainingPlanDto);
  }

  @Get()
  findAll() {
    return this.personalTrainingPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalTrainingPlansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonalTrainingPlanDto: UpdatePersonalTrainingPlanDto) {
    return this.personalTrainingPlansService.update(+id, updatePersonalTrainingPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalTrainingPlansService.remove(+id);
  }
}
