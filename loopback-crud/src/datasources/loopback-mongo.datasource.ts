import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

console.log('USERMONGO',process.env.MONGO_INITDB_ROOT_USERNAME);

const config = {
  name: 'loopback_mongo',
  connector: 'mongodb',
  url: `mongodb://localhost:27020/db-test`,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class LoopbackMongoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'loopback_mongo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.loopback_mongo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
