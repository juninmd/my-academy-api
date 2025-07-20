import { PrismaClient } from '@prisma/client';
import { motivationalPhrases } from './data/motivational-phrases.data';

export async function seedMotivationalPhrases(prisma: PrismaClient) {
  console.log('💬 Criando frases motivacionais...');

  await prisma.motivationalPhrases.createMany({
    data: motivationalPhrases,
    skipDuplicates: true,
  });
}
