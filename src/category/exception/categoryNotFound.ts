import { HttpException, HttpStatus } from '@nestjs/common';

class CategoryNotFoundException extends HttpException {
  constructor(categoryId: number) {
    super(`Category with id ${categoryId} not found`, HttpStatus.NOT_FOUND);
  }
}

export default CategoryNotFoundException;
