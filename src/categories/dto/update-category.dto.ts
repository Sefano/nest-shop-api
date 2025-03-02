import { PartialType } from '@nestjs/mapped-types';
import { CreateCatogeryDto } from './create-category.dto';

export class UpdateCategotyDto extends PartialType(CreateCatogeryDto) {} //partial делает поля необязательными
