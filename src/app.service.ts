import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): object {
    return {
      status: 'ok',
      message: 'CSV to JSON Converter API is running!',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }
}
