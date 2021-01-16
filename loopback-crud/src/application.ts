import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {AuthenticationComponent} from '@loopback/authentication';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { 
  JWTAuthenticationComponent,
  SECURITY_SCHEME_SPEC,
  UserServiceBindings
 } from '@loopback/authentication-jwt';
 import { LoopbackMongoDataSource } from './datasources';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';


export {ApplicationConfig};

export class LoopbackCrudApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);
    this.dataSource(LoopbackMongoDataSource, UserServiceBindings.DATASOURCE_NAME);    

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
