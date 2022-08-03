import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/guard/jwt-authentication.guard';
import FindOneParams from '../utils/findOneParams';
import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/createCategory.dto';
import UpdateCategoryDto from './dto/updateCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get('id')
  getCategoryById(@Param() { id }: FindOneParams) {
    return this.categoryService.getCategoryById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createCategory(@Body() category: CreateCategoryDto) {
    return this.categoryService.createCategory(category);
  }

  @Patch(':id')
  async updateCategory(
    @Param() { id }: FindOneParams,
    @Body() category: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(Number(id), category);
  }
}
