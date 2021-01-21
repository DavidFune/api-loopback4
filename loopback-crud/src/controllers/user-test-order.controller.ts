import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  UserTest,
  Order,
} from '../models';
import {UserTestRepository} from '../repositories';

export class UserTestOrderController {
  constructor(
    @repository(UserTestRepository) protected userTestRepository: UserTestRepository,
  ) { }

  @authenticate('jwt')
  @get('/user-tests/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of UserTest has many Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.userTestRepository.orders(id).find(filter);
  }

  @post('/user-tests/{id}/orders', {
    responses: {
      '200': {
        description: 'UserTest model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UserTest.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInUserTest',
            exclude: ['_id'],
            optional: ['userTestId']
          }),
        },
      },
    }) order: Omit<Order, '_id'>,
  ): Promise<Order> {
    return this.userTestRepository.orders(id).create(order);
  }

  @patch('/user-tests/{id}/orders', {
    responses: {
      '200': {
        description: 'UserTest.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.userTestRepository.orders(id).patch(order, where);
  }

  @del('/user-tests/{id}/orders', {
    responses: {
      '200': {
        description: 'UserTest.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.userTestRepository.orders(id).delete(where);
  }
}
