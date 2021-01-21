import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {UserTest, UserTestWithRelations} from './user-test.model';
import {Product, ProductWithRelations} from './product.model';

@model({settings: {strict: false}})
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @belongsTo(() => UserTest)
  userTestId: string;

  @hasMany(() => Product)
  products: Product[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
  userTest?: UserTestWithRelations;
  products?: ProductWithRelations[];
}

export type OrderWithRelations = Order & OrderRelations;
