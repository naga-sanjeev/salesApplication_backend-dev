import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuResolver } from './menu.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuType } from './dto/menu.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Menu,MenuType])],
  providers: [MenuResolver, MenuService],
})
export class MenuModule {}
