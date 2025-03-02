import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Title cant be empty' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'Description cant be empty' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNotEmpty({ message: 'Price cant be empty' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number and max decimal precision is 2' },
  )
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @IsNotEmpty({ message: 'Stock cant be empty' })
  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock cant be negative' })
  stock: number;

  @IsNotEmpty({ message: 'Images cant be empty' })
  @IsArray({ message: 'Images must be in array format' })
  images: string[];

  @IsNotEmpty({ message: 'Catogory cant be empty' })
  @IsNumber({}, { message: 'Catogory must be a number' })
  categoryId: number;
}
