import { PrismaClient } from '@prisma/client';
import { methods } from './data/methods.data';

export async function seedMethods(prisma: PrismaClient) {
  console.log('📋 Criando métodos de treino...');

  for (const method of methods) {
    await prisma.methods.upsert({
      update: method,
      where: { name: method.name },
      create: method
    });
  }
}
