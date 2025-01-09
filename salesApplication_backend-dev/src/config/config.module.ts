import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
          type: 'mysql',
          host: configService.getOrThrow('mySql_Host'),
          port: configService.getOrThrow('mySql_Port'),
          username: configService.getOrThrow('mySql_Username'),
          password: configService.getOrThrow('mySql_Password'),
          database: configService.getOrThrow('mySql_Database'),
          autoLoadEntities: true,
          synchronize:true
        }),
        inject: [ConfigService],
      }),
    ],
  })
export class DatabaseModule {}