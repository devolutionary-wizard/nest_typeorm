import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userReposity: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    const newUser = this.userReposity.create(createUserDto);
    return this.userReposity.save(newUser);
  }

  findAll() {
    return this.userReposity.find();
  }

  findOne(id: number) {
    return this.userReposity.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return this.userReposity.save({ ...user, ...updateUserDto });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userReposity.remove(user);
  }
}
