import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController, StatisticsController } from './users.controller';
import { User } from './entities/user.entity';
import { CsvModule } from '../csv/csv.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CsvModule,
  ],
  controllers: [UsersController, StatisticsController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}