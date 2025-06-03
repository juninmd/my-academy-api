import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { Personals, WorkoutsGroups } from '@prisma/client';
import { CreateWorkoutsGroupDto } from '../workouts-groups/dto/create-workouts-group.dto';
import { UpdateWorkoutsGroupDto } from '../workouts-groups/dto/update-workouts-group.dto';

@Injectable()
export class PersonalsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createpersonalsDto: CreatePersonalDto) {
    return this.prismaService.personals.create({
      data: createpersonalsDto as Personals,
    });
  }

  async assignWorkoutGroupToStudent(
    personalUserId: string,
    studentUserId: string,
    workoutGroupId: number,
  ) {
    const personalStudentRelation = await this.prismaService.personals.findUnique({
      where: {
        studentUserId_personalUserId: {
          studentUserId: studentUserId,
          personalUserId: personalUserId,
        },
      },
    });

    if (!personalStudentRelation) {
      throw new NotFoundException('Personal-student relationship not found.');
    }

    return this.prismaService.workoutsGroups.update({
      where: { id: workoutGroupId },
      data: {
        userId: studentUserId, // Assign to student
        personalId: personalStudentRelation.id, // Link to personal-student relation
      },
    });
  }

  async createWorkoutGroupForStudent(
    personalUserId: string,
    studentUserId: string,
    createWorkoutGroupDto: CreateWorkoutsGroupDto,
  ) {
    const personalStudentRelation = await this.prismaService.personals.findUnique({
      where: {
        studentUserId_personalUserId: {
          studentUserId: studentUserId,
          personalUserId: personalUserId,
        },
      },
    });

    if (!personalStudentRelation) {
      throw new NotFoundException('Personal-student relationship not found.');
    }

    const { name, observations, workoutsBlocks } = createWorkoutGroupDto; // Revertido para workoutsBlocks (plural)
    return this.prismaService.workoutsGroups.create({
      data: {
        name,
        observations,
        userId: studentUserId,
        personalId: personalStudentRelation.id,
        workoutsBlocks: { // Revertido para workoutsBlocks (plural)
          create: workoutsBlocks?.map((block) => ({
            order: block.order,
            workouts: {
              create: block.workouts?.map((workout) => ({
                exerciseId: workout.exerciseId,
                description: workout.description,
                methodId: workout.methodId,
                workoutSeries: {
                  create: workout.workoutSeries?.map((series) => ({
                    repetitions: series.repetitions,
                    weight: series.weight,
                    rest: series.rest,
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        workoutsBlocks: { // Revertido para workoutsBlocks (plural)
          include: {
            workouts: {
              include: {
                workoutSeries: true,
              },
            },
          },
        },
      },
    });
  }

  async updateWorkoutGroupForStudent(
    personalUserId: string,
    studentUserId: string,
    workoutGroupId: number,
    updateWorkoutGroupDto: UpdateWorkoutsGroupDto,
  ) {
    const personalStudentRelation = await this.prismaService.personals.findUnique({
      where: {
        studentUserId_personalUserId: {
          studentUserId: studentUserId,
          personalUserId: personalUserId,
        },
      },
    });

    if (!personalStudentRelation) {
      throw new NotFoundException('Personal-student relationship not found.');
    }

    const workoutGroup = await this.prismaService.workoutsGroups.findUnique({
      where: { id: workoutGroupId },
    });

    if (!workoutGroup || workoutGroup.userId !== studentUserId || workoutGroup.personalId !== personalStudentRelation.id) {
      throw new NotFoundException('Workout group not found or not associated with this student/personal.');
    }

    const { name, observations, workoutsBlocks } = updateWorkoutGroupDto; // Revertido para workoutsBlocks (plural)

    // Atualiza os dados básicos do grupo de treino
    const updatedWorkoutGroup = await this.prismaService.workoutsGroups.update({
      where: { id: workoutGroupId },
      data: {
        name,
        observations,
        userId: studentUserId,
        personalId: personalStudentRelation.id,
      },
    });

    // Lógica para atualizar WorkoutsBlocks, Workouts e WorkoutSeries:
    // 1. Excluir WorkoutsBlocks, Workouts e WorkoutSeries existentes para este grupo
    const existingworkoutsBlocks = await this.prismaService.workoutsBlocks.findMany({
      where: { workoutGroupId: workoutGroupId },
      select: { id: true, workouts: { select: { id: true } } },
    });

    for (const block of existingworkoutsBlocks) {
      for (const workout of block.workouts) {
        await this.prismaService.workoutSeries.deleteMany({
          where: { workoutId: workout.id },
        });
      }
      await this.prismaService.workouts.deleteMany({
        where: { workoutsBlocksId: block.id },
      });
    }
    await this.prismaService.workoutsBlocks.deleteMany({
      where: { workoutGroupId: workoutGroupId },
    });

    // 2. Recriar WorkoutsBlocks, Workouts e WorkoutSeries se fornecidos
    if (workoutsBlocks && workoutsBlocks.length > 0) { // Revertido para workoutsBlocks (plural)
      for (const blockDto of workoutsBlocks) { // Revertido para workoutsBlocks (plural)
        await this.prismaService.workoutsBlocks.create({
          data: {
            order: blockDto.order,
            workoutGroupId: updatedWorkoutGroup.id,
            workouts: {
              create: blockDto.workouts?.map((workout) => ({
                exerciseId: workout.exerciseId,
                description: workout.description,
                methodId: workout.methodId,
                workoutSeries: {
                  create: workout.workoutSeries?.map((series) => ({
                    repetitions: series.repetitions,
                    weight: series.weight,
                    rest: series.rest,
                  })),
                },
              })),
            },
          },
        });
      }
    }

    return this.prismaService.workoutsGroups.findUnique({
      where: { id: workoutGroupId },
      include: {
        workoutsBlocks: { // Revertido para workoutsBlocks (plural)
          include: {
            workouts: {
              include: {
                workoutSeries: true,
              },
            },
          },
        },
      },
    });
  }

  findAll(personalUserId: string) {
    return this.prismaService.personals.findMany({
      where: {
        personalUserId,
      },
      // Removido include: { PersonalUser: true, StudentUser: true }
      // Para incluir dados de PersonalUser e StudentUser, eles devem ser buscados separadamente
      // ou um DTO de retorno deve ser criado.
    });
  }

  async findStudents(personalUserId: string) {
    const personalRelations = await this.prismaService.personals.findMany({
      where: { personalUserId },
      include: { PersonalClassSchedule: true } // Mantido, pois existe no schema
    });

    const studentsWithSchedule = [];
    for (const relation of personalRelations) {
      const studentUser = await this.prismaService.users.findUnique({
        where: { id: relation.studentUserId }
      });
      if (studentUser) {
        studentsWithSchedule.push({ student: studentUser, schedule: relation.PersonalClassSchedule });
      }
    }
    return studentsWithSchedule.flat(1);
  }

  update(id: number, updateDto: UpdatePersonalDto) {
    return this.prismaService.personals.update({
      where: { id },
      data: updateDto as Personals,
    });
  }

  remove(id: number) {
    return this.prismaService.personals.delete({ where: { id } });
  }
}
