import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import {UserEntity} from "./users/entities/user.entity";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'Felix',
        password: 'Index@2023',
        database: 'organization',
        entities: [UserEntity],
        synchronize: true,

      }),
      UsersModule,
      AuthModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
