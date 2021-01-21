import { UserRepository } from '@loopback/authentication-jwt';
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
import { UserTestRepository } from '../repositories';

export class OrderUserTestController {
  constructor(
    @repository(UserTestRepository)
    public userTestRepository: UserTestRepository,
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
    @param.path.string('_id') _id: typeof UserTest.prototype._id,
  ): Promise<UserTest> {
    return this.userTestRepository.findById(_id);
  }
}
