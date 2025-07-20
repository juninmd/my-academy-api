import { PrismaClient } from '@prisma/client';
import { exercises } from './data/exercises.data';

export async function seedExercises(prisma: PrismaClient) {
  console.log('💪 Criando exercícios...');

  for (const exercise of exercises) {
    await prisma.exercises.upsert({
      where: { name: exercise.name },
      update: {},
      create: exercise
    });
  }
}
