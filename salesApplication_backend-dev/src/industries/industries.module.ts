import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IndustriesService } from './industries.service';
import { IndustriesResolver } from './industries.resolver';
import { Industries } from './industries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Industries])],
  providers: [IndustriesService, IndustriesResolver],
})
export class IndustriesModule {}
