import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';

config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity, CategoryEntity, ProductEntity, ReviewEntity],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  logging: false,
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
