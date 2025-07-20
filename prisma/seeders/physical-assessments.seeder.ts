import { PrismaClient } from '@prisma/client';
import { assessments } from './data/physical-assessments.data';

export async function seedPhysicalAssessments(prisma: PrismaClient) {
  console.log('📊 Criando avaliações físicas...');

  for (const assessment of assessments) {
    await prisma.physicalAssessment.create({
      data: {
        userId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
        tricepsSkinfold: Math.floor(Math.random() * 10) + 10, // Exemplo de valor
        bicepsSkinfold: Math.floor(Math.random() * 10) + 8,
        subscapularSkinfold: Math.floor(Math.random() * 10) + 12,
        suprailiacSkinfold: Math.floor(Math.random() * 10) + 15,
        midaxillarySkinfold: Math.floor(Math.random() * 10) + 7,
        pectoralSkinfold: Math.floor(Math.random() * 10) + 9,
        thighSkinfold: Math.floor(Math.random() * 10) + 18,
        ...assessment
      }
    });
  }
}
