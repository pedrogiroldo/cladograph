import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

async function excludePasswordMiddleware(params, next) {
  const result = await next(params);
  if (params?.model === 'User' && params?.args?.select?.password !== true) {
    delete result.password;
  }
  return result;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$use(excludePasswordMiddleware);
    await this.$connect();
  }
}
