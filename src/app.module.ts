import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RegisterUserController } from './controller/users/register-user.controller';
import { CreateUserService } from './service/create-user.service';
import { UserInterface } from './interface/user.interface';
import { UserRepository } from './repository/user.repository';
import { HashEncoder } from './interface/cryptography/hash-encoder.interface';
import { HashRepository } from './repository/cryptography/hash.repository';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { AuthenticateUserService } from './service/authenticate-user.service';
import { HashCompare } from './interface/cryptography/hash-compare.interface';
import { AuthModule } from './auth/auth.module';
import { AuthenticateUserController } from './controller/users/authenticate-user.controller';
import { UpdateUserService } from './service/update-user.service';
import { UpdateUserController } from './controller/users/update-user.controller';

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
    UpdateUserController
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
    UpdateUserService
  ],
})
export class AppModule {}
