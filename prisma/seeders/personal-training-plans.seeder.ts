import { PrismaClient } from '@prisma/client';

export async function seedPersonalTrainingPlans(prisma: PrismaClient) {
  console.log('📅 Criando plano de treino pessoal...');

  const personalStudentRelation = await prisma.personals.findFirst({
    where: {
      studentUserId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
      personalUserId: 'RLS96KOMtpYCFol3o1F6S0vdf5I2'
    }
  });

  if (!personalStudentRelation) {
    console.warn('Relação personal-aluno não encontrada. Pulando criação do plano de treino pessoal.');
    return;
  }

  await prisma.personalTrainingPlan.create({
    data: {
      personalId: personalStudentRelation.id, // Usar o ID da relação personal-aluno
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      sessionsPerWeek: 4,
      reschedulesPerMonthLimit: 2,
      pricePerSession: 80.0,
      billingType: 'separate',
      status: 'active'
    }
  });
}
