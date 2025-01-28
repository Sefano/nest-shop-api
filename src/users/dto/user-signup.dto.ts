import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserSignUp {
  @IsNotEmpty({ message: 'Name can not be null' })
  @IsString({ message: 'Name must be a string' })
  name: string;
  @IsNotEmpty({ message: 'Email can not be null' })
  @IsEmail({}, { message: 'Invalid format of email' })
  email: string;
  @IsNotEmpty({ message: 'Password can not be null' })
  @MinLength(12, { message: 'Password must be minimum 12 symbols length' })
  password: string;
}
