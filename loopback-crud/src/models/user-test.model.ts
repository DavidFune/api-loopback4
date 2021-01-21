import {Entity, model, property, hasMany} from '@loopback/repository';
import {Order, OrderWithRelations} from './order.model';

@model()
export class UserTest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => Order)
  orders: Order[];

  constructor(data?: Partial<UserTest>) {
    super(data);
  }
}

export interface UserTestRelations {
  // describe navigational properties here
  orders?: OrderWithRelations[];
}

export type UserTestWithRelations = UserTest & UserTestRelations;
