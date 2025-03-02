import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCatogeryDto {
  @IsNotEmpty({ message: 'Title cant be empty' })
  @IsString({ message: 'Title must be a string' })
  title: string;
  @IsNotEmpty({ message: 'Description cant be empty' })
  @IsString({ message: 'Description must be a string' })
  description: string;
}
