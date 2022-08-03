import ProductCategory from '../productCategory/productCategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookProperties } from './type/bookProperties.interface';
import { CarProperties } from './type/carProperties.interface';

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(
    () => ProductCategory,
    (productCategory: ProductCategory) => productCategory.products,
  )
  category: ProductCategory;

  @Column({
    type: 'jsonb',
  })
  public properties: CarProperties | BookProperties;
}

export default Product;
