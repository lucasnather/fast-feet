import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RegisterUserController } from './controller/users/register-user.controller';
import { CreateUserService } from './service/create-user.service';
import { UserInterface } from './interface/user.interface';
import { UserRepository } from './repository/user.repository';
import { HashEncoder } from './interface/cryptography/hash-encoder.interface';
import { HashRepository } from './repository/cryptography/hash.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterUserController],
  providers: [
    {
      provide: UserInterface,
      useClass: UserRepository,
    },
    {
      provide: HashEncoder,
      useClass: HashRepository
    },
    CreateUserService
  ],
})
export class AppModule {}
