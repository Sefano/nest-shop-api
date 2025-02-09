import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import bcrypt, { compare, hash } from 'bcryptjs';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(userSignUpDto.email);
    if (userExists) {
      throw new BadRequestException('User with this email is already exists');
    }
    userSignUpDto.password = await hash(userSignUpDto.password, 6);
    const user = this.usersRepository.create(userSignUpDto);
    return await this.usersRepository.save(user);
  }

  async signin(userSignInDto: UserSignInDto) {
    const userExists = await this.usersRepository.findOne({
      where: { email: userSignInDto.email },
      select: {
        id: true,
        name: true,
        email: true,
        roles: true,
        password: true,
      },
    });

    if (!userExists) {
      throw new BadRequestException('Wrong email or password');
    }
    const comparePassword = await compare(
      userSignInDto.password,
      userExists.password,
    );
    if (!comparePassword) {
      throw new BadRequestException('Wrong email or password');
    }
    delete userExists.password;
    return userExists;
  }

  async accessToken(user: UserEntity) {
    return sign(
      { id: user.id, email: user.email, roles: user.roles },
      process.env.ACCESS_SECRET,
      { expiresIn: '60m' },
    );
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
