import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Order, OrderRelations, UserTest, Product} from '../models';
import {LoopbackMongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserTestRepository} from './user-test.repository';
import {ProductRepository} from './product.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype._id,
  OrderRelations
> {

  public readonly userTest: BelongsToAccessor<UserTest, typeof Order.prototype._id>;

  public readonly products: HasManyRepositoryFactory<Product, typeof Order.prototype._id>;

  constructor(
    @inject('datasources.loopback_mongo') dataSource: LoopbackMongoDataSource, @repository.getter('UserTestRepository') protected userTestRepositoryGetter: Getter<UserTestRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Order, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.userTest = this.createBelongsToAccessorFor('userTest', userTestRepositoryGetter,);
    this.registerInclusionResolver('userTest', this.userTest.inclusionResolver);
  }
}
