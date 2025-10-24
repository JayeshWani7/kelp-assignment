import * as fs from 'fs';
import * as readline from 'readline';

export interface ParsedRow {
  name: string;
  age: number;
  address?: object;
  additionalInfo?: object;
}

export class CsvParser {
  async parseFile(filePath: string): Promise<ParsedRow[]> {
    if (!fs.existsSync(filePath)) {
      throw new Error(`CSV file not found: ${filePath}`);
    }

    const results: ParsedRow[] = [];
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let headers: string[] = [];
    let isFirstLine = true;

    for await (const line of rl) {
      if (isFirstLine) {
        headers = this.parseLine(line);
        isFirstLine = false;
        continue;
      }

      if (line.trim()) {
        const values = this.parseLine(line);
        const parsed = this.transformRow(headers, values);
        if (parsed) {
          results.push(parsed);
        }
      }
    }

    return results;
  }

  private parseLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  }

  private transformRow(headers: string[], values: string[]): ParsedRow | null {
    if (headers.length !== values.length) {
      return null;
    }

    let firstName = '';
    let lastName = '';
    let ageValue = '';
    const address: any = {};
    const additionalInfo: any = {};
    // Single pass through headers: O(n)
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const value = values[i];
      
      if (!header || !value) continue;
      
      if (header === 'name.firstName') {
        firstName = value;
      } else if (header === 'name.lastName') {
        lastName = value;
      } else if (header === 'age') {
        ageValue = value;
      } else if (header.startsWith('address.')) {
        const addressKey = header.substring(8); 
        const keys = addressKey.split('.');
        this.setNestedValue(address, keys, value);
      } else {
        const keys = header.split('.');
        this.setNestedValue(additionalInfo, keys, value);
      }
    }
    
    if (!firstName && !lastName) {
      return null;
    }

    const age = parseInt(ageValue, 10);
    if (isNaN(age) || age < 0) {
      return null;
    }
    
    const name = `${firstName} ${lastName}`.trim();
    
    return {
      name,
      age,
      address: Object.keys(address).length > 0 ? address : undefined,
      additionalInfo: Object.keys(additionalInfo).length > 0 ? additionalInfo : undefined,
    };
  }

  private setNestedValue(obj: any, keys: string[], value: string): void {
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i].trim();
      current = current[key] ??= {};
    }
    current[keys[keys.length - 1].trim()] = value;
  }

  private hasValidData(obj: any): boolean {
    if (!obj || typeof obj !== 'object') return false;
    
    return Object.values(obj).some(value => {
      if (typeof value === 'string') return value.trim().length > 0;
      if (typeof value === 'object') return this.hasValidData(value);
      return value !== null && value !== undefined;
    });
  }
}