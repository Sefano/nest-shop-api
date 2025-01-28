import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUp } from './dto/user-signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUp: UserSignUp): Promise<UserEntity> {
    const user = this.usersRepository.create(userSignUp);
    return await this.usersRepository.save(user);
  }
}
