import { SetMetadata } from '@nestjs/common';
import { RoleName } from '@prisma/client'; // Corrigido para RoleName

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleName[]) => SetMetadata(ROLES_KEY, roles); // Corrigido para RoleName
