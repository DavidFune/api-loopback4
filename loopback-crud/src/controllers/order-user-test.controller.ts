import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Order,
  UserTest,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderUserTestController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/user-test', {
    responses: {
      '200': {
        description: 'UserTest belonging to Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserTest)},
          },
        },
      },
    },
  })
  async getUserTest(
    @param.path.string('id') id: typeof Order.prototype._id,
  ): Promise<UserTest> {
    return this.orderRepository.userTest(id);
  }
}
