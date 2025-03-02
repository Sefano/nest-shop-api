import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCatogeryDto } from './dto/create-category.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UpdateCategotyDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCatogeryDto, currentUser: UserEntity) {
    const category = this.categoryRepository.create(createCategoryDto);
    category.addedBy = currentUser;
    return this.categoryRepository.save(category);
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne({
      where: { id: id },
      relations: { addedBy: true },
      select: {
        addedBy: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async update(id: number, fields: Partial<UpdateCategotyDto>) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    Object.assign(category, fields);
    return await this.categoryRepository.save(category);
  }
}
