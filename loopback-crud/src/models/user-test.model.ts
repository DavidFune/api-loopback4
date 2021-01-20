import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<UserTest>) {
    super(data);
  }
}

export interface UsertestRelations {
  // describe navigational properties here
}

export type UsertestWithRelations = UserTest & UsertestRelations;
