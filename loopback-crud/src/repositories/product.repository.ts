import {DefaultCrudRepository} from '@loopback/repository';
import {Product, ProductRelations} from '../models';
import {LoopbackMongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {
  constructor(
    @inject('datasources.loopback_mongo') dataSource: LoopbackMongoDataSource,
  ) {
    super(Product, dataSource);
  }
}
