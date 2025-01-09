import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects, ProjectsHistory } from './projects.entity';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Projects, ProjectsHistory])],
  providers: [ProjectsResolver, ProjectsService],
  exports: [ProjectsService], 
})
export class ProjectsModule {}
