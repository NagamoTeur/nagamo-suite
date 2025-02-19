import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module'; // ✅ Ajout de AuthModule

@Module({
  imports: [AuthModule],  // ✅ Ajout de AuthModule pour accéder à JwtService et JwtAuthGuard
  controllers: [UserController],
  providers: [PrismaService],
})
export class UserModule {}

