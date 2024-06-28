import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env.js';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './auth/auth.module.js';
import { RegisterUserController } from './controller/users/register-user.controller.js';
import { AuthenticateUserController } from './controller/users/authenticate-user.controller.js';
import { UpdateUserController } from './controller/users/update-user.controller.js';
import { DeleteUserController } from './controller/users/delete-user.controller.js';
import { UserInterface } from './interface/user.interface.js';
import { UpdateUserService } from './service/update-user.service.js';
import { DeleteUserService } from './service/delete-user.service.js';
import { AuthenticateUserService } from './service/authenticate-user.service.js';
import { CreateUserService } from './service/create-user.service.js';
import { HashCompare } from './interface/cryptography/hash-compare.interface.js';
import { HashRepository } from './repository/cryptography/hash.repository.js';
import { HashEncoder } from './interface/cryptography/hash-encoder.interface.js';
import { UserRepository } from './repository/user.repository.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env)
    }),
    DatabaseModule,
    AuthModule, 
  ],
  controllers: [
    RegisterUserController, 
    AuthenticateUserController,
    UpdateUserController,
    DeleteUserController
  ],
  providers: [
    {
      provide: UserInterface,
      useClass: UserRepository,
    },
    {
      provide: HashEncoder,
      useClass: HashRepository
    },
    {
      provide: HashCompare,
      useClass: HashRepository
    },
    CreateUserService,
    AuthenticateUserService, 
    UpdateUserService,
    DeleteUserService
  ],
})
export class AppModule {}
