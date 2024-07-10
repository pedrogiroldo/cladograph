import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../database/prisma/prisma.service';
import { AuthUserDto } from './dto/auth-user.dto';

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

  async authenticate(authUserDto: AuthUserDto) {
    try {
      const userEmail = authUserDto.email;
      const userPassword = authUserDto.password;

      const user = await this.prismaService.user.findUnique({
        where: { email: userEmail },
      });

      this.verifyIfUserExists(user);

      this.verifyPassword(user, userPassword);

      return { auth: true, message: 'Success' };
    } catch (error) {
      return error;
    }
  }

  private verifyIfUserExists(user: User) {
    if (!user) {
      throw new HttpException(
        { auth: false, message: 'User not found!' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private verifyPassword(user: User, password: string) {
    if (user.password !== password) {
      throw new HttpException(
        {
          auth: false,
          message: 'Wrong password!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
