import { PrismaClient } from '@prisma/client';

export async function seedPersonalStudentRelation(prisma: PrismaClient) {
  console.log('🤝 Criando relacionamento personal-aluno...');

  await prisma.personals.upsert({
    where: {
      studentUserId_personalUserId: {
        studentUserId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
        personalUserId: 'RLS96KOMtpYCFol3o1F6S0vdf5I2'
      }
    },
    update: {},
    create: {
      studentUserId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
      personalUserId: 'RLS96KOMtpYCFol3o1F6S0vdf5I2'
    }
  });
}
