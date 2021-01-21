import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {UserTest, UserTestRelations, Order} from '../models';
import {LoopbackMongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrderRepository} from './order.repository';
import { UserRepository } from '@loopback/authentication-jwt';

export class UserTestRepository extends DefaultCrudRepository<
  
  UserTest,
  typeof UserTest.prototype._id,
  UserTestRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof UserTest.prototype._id>;

  constructor(
    @inject('datasources.loopback_mongo') dataSource: LoopbackMongoDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(UserTest, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
