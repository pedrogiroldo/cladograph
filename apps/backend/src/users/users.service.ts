import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(data: Prisma.UserCreateInput) {
    try {
      const createdUser = this.prismaService.user.create({
        data,
      });
      return createdUser;
    } catch (error) {
      return error;
    }
  }

  findAll() {
    try {
      const allUsers = this.prismaService.user.findMany();
      return allUsers;
    } catch (error) {
      return error;
    }
  }

  findOne(id: string) {
    try {
      const user = this.prismaService.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      return error;
    }
  }

  update(id: string, data: Prisma.UserUpdateInput) {
    try {
      const updatedUser = this.prismaService.user.update({
        where: { id },
        data,
      });
      return updatedUser;
    } catch (error) {
      return error;
    }
  }

  remove(id: string) {
    try {
      const deletedUser = this.prismaService.user.delete({
        where: { id },
      });

      return deletedUser;
    } catch (error) {
      return error;
    }
  }
}
