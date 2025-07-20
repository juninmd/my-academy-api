import { PrismaClient, RoleName } from '@prisma/client';
import { roles } from './data/roles.data';

export async function seedRoles(prisma: PrismaClient) {
  console.log('🔑 Criando roles...');

  for (const role of roles) {
    await prisma.roleUser.upsert({
      where: { name: role.name as RoleName },
      update: {},
      create: { ...role, name: role.name as RoleName }
    });
  }
}
