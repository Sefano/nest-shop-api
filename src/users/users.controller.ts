import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/decarators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthRoles } from 'src/decarators/roles.decorator';
import { Roles } from '../utils/user-roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async signup(@Body() userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    return await this.usersService.signup(userSignUpDto);
  }

  @Post('/signin')
  async signin(@Body() userSignInDto: UserSignInDto) {
    const user = await this.usersService.signin(userSignInDto);
    const accessToken = await this.usersService.accessToken(user);
    return { accessToken, user };
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async getProfile(@CurrentUser() currentUser: UserEntity) {
    return currentUser;
  }

  @AuthRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/all')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }
}
