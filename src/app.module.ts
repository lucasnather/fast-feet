import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RegisterUserController } from './controller/users/register-user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterUserController],
  providers: [],
})
export class AppModule {}
