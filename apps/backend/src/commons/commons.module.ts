import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { PasswordHasherService } from '../modules/password-hasher/password-hasher.service';
import { JwtService } from '@nestjs/jwt';
import { UsersGuard } from '../guards/users.guard';

@Global()
@Module({
  providers: [PrismaService, PasswordHasherService, JwtService, UsersGuard],
  exports: [PrismaService, PasswordHasherService, JwtService, UsersGuard],
})
export class CommonsModule {}
