import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/guard/jwt-authentication.guard';
import CreateCategoryDto from './dto/createProductCategory.dto';
import ProductCategoryService from './productCategory.service';

@Controller('produc-category')
@UseInterceptors(ClassSerializerInterceptor)
export default class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get()
  getAllProduct() {
    return this.productCategoryService.getAllProductCategories();
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createProduct(@Body() productCategory: CreateCategoryDto) {
    return await this.productCategoryService.createProductCategory(
      productCategory,
    );
  }
}
