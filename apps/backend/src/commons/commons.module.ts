import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CommonsModule {}
