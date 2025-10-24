import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CsvService } from '../csv/csv.service';
import { AgeDistribution } from './dto/age-distribution.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private csvService: CsvService,
  ) {}

  async uploadFromCsv(): Promise<{ success: boolean; recordsProcessed: number }> {
    try {
      const parsedData = await this.csvService.parseCsvFile();
      
      if (parsedData.length === 0) {
        return { success: true, recordsProcessed: 0 };
      }
      
      const batchSize = 500; // Process in smaller batches
      let totalProcessed = 0;
      
      for (let i = 0; i < parsedData.length; i += batchSize) {
        const batch = parsedData.slice(i, i + batchSize);
        const users = batch.map(data => this.usersRepository.create(data));
        await this.usersRepository.save(users);
        totalProcessed += users.length;
        
        if (totalProcessed % 5000 === 0) {
          console.log(`Processed ${totalProcessed} records...`);
        }
      }
      
      console.log(`Total records processed: ${totalProcessed}`);
      await this.printAgeDistribution();
      
      return {
        success: true,
        recordsProcessed: totalProcessed,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async getAgeDistribution(): Promise<AgeDistribution[]> {
    const users = await this.usersRepository.find();
    const total = users.length;

    if (total === 0) {
      return [];
    }

    const groups = {
      '< 20': 0,
      '20 to 40': 0,
      '40 to 60': 0,
      '> 60': 0,
    };

    users.forEach(user => {
      if (user.age < 20) {
        groups['< 20']++;
      } else if (user.age >= 20 && user.age <= 40) {
        groups['20 to 40']++;
      } else if (user.age > 40 && user.age <= 60) {
        groups['40 to 60']++;
      } else {
        groups['> 60']++;
      }
    });

    return Object.entries(groups).map(([ageGroup, count]) => ({
      ageGroup,
      count,
      percentage: parseFloat(((count / total) * 100).toFixed(2)),
    }));
  }

  async printAgeDistribution(): Promise<void> {
    const distribution = await this.getAgeDistribution();
    
    if (distribution.length === 0) {
      return;
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('Age Distribution Report');
    console.log('='.repeat(50));
    console.log('Age-Group\t\t% Distribution');
    console.log('-'.repeat(50));
    
    distribution.forEach(dist => {
      const ageGroup = dist.ageGroup.padEnd(16);
      console.log(`${ageGroup}\t${dist.percentage}`);
    });
    
    console.log('='.repeat(50) + '\n');
  }
}