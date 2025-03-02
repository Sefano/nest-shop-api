import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCatogeryDto } from './dto/create-category.dto';
import { CurrentUser } from 'src/decarators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthRoles } from 'src/decarators/roles.decorator';
import { Roles } from 'src/utils/user-roles.enum';
import { UpdateCategotyDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @AuthRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(
    @Body() createCategoryDto: CreateCatogeryDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.categoriesService.create(createCategoryDto, currentUser);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoriesService.findOne(+id);
  }

  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @AuthRoles(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategotyDto,
  ) {
    return await this.categoriesService.update(+id, updateCategoryDto);
  }
}
