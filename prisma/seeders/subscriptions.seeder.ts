import { PrismaClient } from '@prisma/client';

export async function seedSubscriptions(prisma: PrismaClient) {
  console.log('💳 Criando assinatura...');

  await prisma.subscription.create({
    data: {
      userId: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'ACTIVE',
      amount: 150.0,
      paymentDate: new Date('2024-01-01')
    }
  });
}
