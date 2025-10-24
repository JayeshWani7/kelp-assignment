import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CsvParser, ParsedRow } from './parsers/csv-parser';

@Injectable()
export class CsvService {
  private parser: CsvParser;

  constructor(private configService: ConfigService) {
    this.parser = new CsvParser();
  }

  async parseCsvFile(): Promise<ParsedRow[]> {
    const filePath = this.configService.get<string>('csv.filePath');
    
    if (!filePath) {
      throw new Error('CSV file path not configured');
    }

    try {
      const result = await this.parser.parseFile(filePath);
      return result;
    } catch (error) {
      throw new Error(`CSV parsing failed: ${error.message}`);
    }
  }
}