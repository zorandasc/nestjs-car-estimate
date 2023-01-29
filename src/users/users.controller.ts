import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Serialize } from '../interceptors/serialize.interceptor';
import { OutputUserDto } from './dto/output-user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
//@Serialize is our custom intrceptor/decorator
//this decorator converT UserEntity RESPONSE (object with password)
//to OutpuUserdTO OBJECT (without password)
@Serialize(OutputUserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() sesssion: any) {
    const user = await this.authService.signin(body.email, body.password);
    sesssion.userId = user.id;
    return user;
  }
  /*
  @Get('whoami')
  whoAmi(@Session() session: any) {
    return this.usersService.findOne(session.userId);
  }
*/
  //@CurrentUser() OUR CUSTOM PARAM DECORATOR TO EXSTRACT LOGED IN USER FROM COOKIE
  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmi(@CurrentUser() user: User) {
    return user;
  }

  @Post('signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
