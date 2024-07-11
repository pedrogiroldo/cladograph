import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../database/prisma/prisma.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordHasherService } from '../modules/password-hasher/password-hasher.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordHasherService: PasswordHasherService,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: CreateUserDto) {
    try {
      const { email, password, name } = data;

      const tryToFindUserWithEmail = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (this.userExists(tryToFindUserWithEmail)) {
        throw new BadRequestException('User already exists');
      }

      const hashedPassword =
        await this.passwordHasherService.hashPassword(password);

      const createdUser = await this.prismaService.user.create({
        data: { name, email, password: hashedPassword },
      });

      const tokens = await this.generateUserTokens(undefined, createdUser.id);

      return { message: 'Success', tokens };
    } catch (error) {
      return error;
    }
  }

  async login(authUserDto: AuthUserDto) {
    try {
      const userEmail = authUserDto.email;
      const userPassword = authUserDto.password;

      const user = await this.prismaService.user.findUnique({
        where: { email: userEmail },
      });

      if (!this.userExists(user)) {
        this.wrongCredentialsError();
      }

      if (!(await this.passwordIsCorrect(user, userPassword))) {
        this.wrongCredentialsError();
      }

      const tokens = await this.generateUserTokens(undefined, user.id);

      return { auth: true, tokens };
    } catch (error) {
      return error;
    }
  }

  async refreshTokens(refreshToken: string) {
    try {
      const token = await this.prismaService.refreshToken.findFirst({
        where: {
          token: refreshToken,
          expiryDate: { gte: new Date() },
        },
      });

      if (!token) {
        this.wrongCredentialsError();
      }

      return this.generateUserTokens(token.token, token.userId);
    } catch (error) {
      return error;
    }
  }

  private userExists(user: User) {
    if (!user) {
      return false;
    } else return true;
  }

  private async passwordIsCorrect(user: User, password: string) {
    if (
      !(await this.passwordHasherService.comparePasswords(
        password,
        user.password,
      ))
    ) {
      return false;
    } else return true;
  }

  private wrongCredentialsError() {
    throw new UnauthorizedException({
      auth: false,
      message: 'Wrong Credentials',
    });
  }

  private async generateUserTokens(token: string, userId: string) {
    const accessToken = this.jwtService.sign({ userId });
    // const refreshToken: string = uuidv4();

    const refreshToken = await this.storeRefreshToken(token, userId);

    return { accessToken, refreshToken };
  }

  private async storeRefreshToken(token: string, userId: string) {
    const expiryDate = new Date();
    // Calculate expiry date 14 days from now
    expiryDate.setDate(expiryDate.getDate() + 14);
    const newToken = uuidv4();

    const refreshToken = await this.prismaService.refreshToken.upsert({
      where: { userId },
      update: {
        token: newToken,
        expiryDate,
      },
      create: {
        expiryDate,
        userId,
      },
    });

    return refreshToken.token;
  }

  async findAll() {
    try {
      const allUsers = await this.prismaService.user.findMany();
      return allUsers;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      user.password = undefined;

      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data,
      });
      return updatedUser;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const deletedUser = await this.prismaService.user.delete({
        where: { id },
      });

      return deletedUser;
    } catch (error) {
      return error;
    }
  }
}
