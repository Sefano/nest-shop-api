import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'Product should not be empty' })
  @IsNumber({}, { message: 'Product Id should be a number' })
  productId: number;

  @IsNotEmpty({ message: 'Rating should not be empty' })
  @IsNumber({}, { message: 'Rating should be a number' })
  ratings: number;

  @IsNotEmpty({ message: 'Comment should not be empty' })
  @IsString({ message: 'Comment should be a string' })
  comment: string;
}
