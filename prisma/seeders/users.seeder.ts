import { PrismaClient } from '@prisma/client';

export async function seedUsers(prisma: PrismaClient) {
  console.log('👤 Criando usuários...');

  // Seu usuário (aluno)
  await prisma.users.upsert({
    where: { id: 'db6i035Vjtb77a7cBDnXQVPd3oL2' },
    update: {},
    create: {
      id: 'db6i035Vjtb77a7cBDnXQVPd3oL2',
      email: 'jr_acn@hotmail.com',
      name: 'Antonio',
      photoUrl: 'https://w7.pngwing.com/pngs/620/837/png-transparent-bodybuilding-drawing-bodybuilding-physical-fitness-logo-monochrome-thumbnail.png',
      roles: { create: { roleUser: { connect: { name: 'STUDENT' } } } },
      fcmToken: 'sample_fcm_token_student'
    }
  });

  // Personal Trainer
  await prisma.users.upsert({
    where: { id: 'RLS96KOMtpYCFol3o1F6S0vdf5I2' },
    update: {},
    create: {
      id: 'RLS96KOMtpYCFol3o1F6S0vdf5I2',
      email: 'personal@gym.com',
      name: 'Carlos Silva',
      photoUrl: 'https://w7.pngwing.com/pngs/620/837/png-transparent-bodybuilding-drawing-bodybuilding-physical-fitness-logo-monochrome-thumbnail.png',
      roles: { create: { roleUser: { connect: { name: 'PERSONAL' } } } },
      fcmToken: 'sample_fcm_token_personal'
    }
  });

  // Dono da academia
  await prisma.users.upsert({
    where: { id: 'academy_owner_001' },
    update: {},
    create: {
      id: 'academy_owner_001',
      email: 'owner@gym.com',
      name: 'Maria Academia',
      photoUrl: 'https://w7.pngwing.com/pngs/620/837/png-transparent-bodybuilding-drawing-bodybuilding-physical-fitness-logo-monochrome-thumbnail.png',
      roles: { create: { roleUser: { connect: { name: 'ACADEMY_OWNER' } } } },
      fcmToken: 'sample_fcm_token_owner'
    }
  });
}
