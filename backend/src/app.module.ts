// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';  // Nous allons créer ce module ci-dessous
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
})
export class AppModule {}

