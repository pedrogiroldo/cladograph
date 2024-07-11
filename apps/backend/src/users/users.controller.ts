import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestWithUserId, UsersGuard } from 'src/guards/users.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  create(@Body() createUserDTO: CreateUserDto) {
    return this.usersService.create(createUserDTO);
  }

  @UseGuards(UsersGuard)
  @Get()
  findOne(@Req() req: RequestWithUserId) {
    return this.usersService.findOne(req.userId);
  }

  @Post('/login')
  login(@Body() authUserDto: AuthUserDto) {
    return this.usersService.login(authUserDto);
  }

  @Post('/refresh/:refreshToken')
  refreshTokens(@Param('refreshToken') refreshToken: string) {
    return this.usersService.refreshTokens(refreshToken);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
