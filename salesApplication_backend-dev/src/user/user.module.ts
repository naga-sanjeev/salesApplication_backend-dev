import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UsersDetails } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersDetails])],
  providers: [UserService, UserResolver],
})
export class UserModule {}
