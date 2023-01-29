import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  //ovo je @InjectRepository(User) zboh typu script generic types na kraju Repository<User>
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({
      email,
      password,
    });
    return this.repo.save(user);
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  findOne(id: number) {
    return id ? this.repo.findOneBy({ id }) : null;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    //this.repo.UPDATE(), INSERT(), DELETE(), DONT INVOKE HOOKFS IN ENTYTTY
    //SAVE(), REMOVE() HAVE LITILEBIT SMALLER EFFICENCY BECUSE REQUIRE TWO TRIP TO DB
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, updateUserDto);
    return this.repo.save(user);
  }

  async remove(id: number) {
    //this.repo.UPDATE(), INSERT(), DELETE(), DONT INVOKE HOOKFS IN ENTYTTY
    //SAVE(), REMOVE() HAVE LITILEBIT SMALLER EFFICENCY BECUSE REQUIRE TWO TRIP TO DB
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
