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

    const nestedObj = this.buildNestedObject(headers, values);
    
    const firstName = nestedObj.name?.firstName || '';
    const lastName = nestedObj.name?.lastName || '';
    const ageValue = nestedObj.age;
    
    if (!firstName && !lastName) {
      return null;
    }

    const age = parseInt(ageValue, 10);
    if (isNaN(age) || age < 0) {
      return null;
    }
    
    const name = `${firstName} ${lastName}`.trim();
    const address = nestedObj.address && this.hasValidData(nestedObj.address) 
      ? nestedObj.address 
      : null;
    
    const additionalInfo: any = {};
    for (const key in nestedObj) {
      if (key !== 'name' && key !== 'age' && key !== 'address') {
        if (this.hasValidData(nestedObj[key])) {
          additionalInfo[key] = nestedObj[key];
        }
      }
    }

    return {
      name,
      age,
      address: address || undefined,
      additionalInfo: Object.keys(additionalInfo).length > 0 ? additionalInfo : undefined,
    };
  }

  private buildNestedObject(headers: string[], values: string[]): any {
    const result: any = {};

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const value = values[i];
      
      if (!header) continue;

      const keys = header.split('.');
      let current = result;

      for (let j = 0; j < keys.length; j++) {
        const key = keys[j].trim();
        
        if (j === keys.length - 1) {
          current[key] = value;
        } else {
          if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {};
          }
          current = current[key];
        }
      }
    }

    return result;
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