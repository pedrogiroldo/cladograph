import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import PrismaMiddlewares from './prisma.middlewares';

const prismaMiddlewares = new PrismaMiddlewares();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$use(prismaMiddlewares.excludePassword);
    await this.$use(prismaMiddlewares.blockFields);
    await this.$connect();
  }
}
