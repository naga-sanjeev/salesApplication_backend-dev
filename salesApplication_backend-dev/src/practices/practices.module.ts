import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Practices  } from './practices.entity';
import { PracticesResolver } from './practices.resolver';
import { PracticesService } from './practices.service';


@Module({
  imports: [TypeOrmModule.forFeature([Practices])],
  providers: [PracticesResolver, PracticesService],
  exports: [PracticesService], 
})
export class PracticesModule {}

