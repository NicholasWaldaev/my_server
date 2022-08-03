import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateCategoryDto from './dto/createProductCategory.dto';
import ProductCategory from './productCategory.entity';

@Injectable()
export default class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  getAllProductCategories() {
    return this.productCategoryRepository.find();
  }

  async createProductCategory(category: CreateCategoryDto) {
    const newProductCategory = await this.productCategoryRepository.create(
      category,
    );
    await this.productCategoryRepository.save(newProductCategory);
    return newProductCategory;
  }
}
