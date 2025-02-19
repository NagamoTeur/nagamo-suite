import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()  // Rendre ce module accessible globalement
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

