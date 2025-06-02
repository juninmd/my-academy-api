import { Injectable } from '@nestjs/common';
import { CreatePersonalTrainingPlanDto } from './dto/create-personal-training-plan.dto';
import { UpdatePersonalTrainingPlanDto } from './dto/update-personal-training-plan.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PersonalTrainingPlansService {
  constructor(private prisma: PrismaService) {}

  create(createPersonalTrainingPlanDto: CreatePersonalTrainingPlanDto) {
    return this.prisma.personalTrainingPlan.create({
      data: createPersonalTrainingPlanDto,
    });
  }

  findAll() {
    return this.prisma.personalTrainingPlan.findMany();
  }

  findOne(id: number) {
    return this.prisma.personalTrainingPlan.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePersonalTrainingPlanDto: UpdatePersonalTrainingPlanDto) {
    return this.prisma.personalTrainingPlan.update({
      where: { id },
      data: updatePersonalTrainingPlanDto,
    });
  }

  remove(id: number) {
    return this.prisma.personalTrainingPlan.delete({
      where: { id },
    });
  }
}
