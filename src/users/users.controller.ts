import { Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AgeDistribution } from './dto/age-distribution.dto';
import { UploadResult } from './dto/upload-result.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('upload-csv')
  async uploadCsvFromConfig(): Promise<UploadResult> {
    const result = await this.usersService.uploadFromCsv();
    
    return {
      ...result,
      message: 'CSV file processed successfully',
    };
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }
}

@Controller('statistics')
export class StatisticsController {
  constructor(private usersService: UsersService) {}

  @Get('age-distribution')
  async getAgeDistribution(): Promise<AgeDistribution[]> {
    return this.usersService.getAgeDistribution();
  }
}