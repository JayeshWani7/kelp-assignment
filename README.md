# CSV to JSON Converter API

A NestJS application that converts CSV files to JSON format and stores data in PostgreSQL with custom parsing logic.

## Features

- **Custom CSV Parser**: Built without external CSV parsing libraries using Node.js `fs` and `readline`
- **Nested Object Support**: Handles dot notation properties (`name.firstName`, `address.city`) with unlimited depth
- **Batch Processing**: Handles large datasets (50K+ records) efficiently with 500-record chunks
- **PostgreSQL Integration**: JSONB fields for flexible nested data storage
- **Age Distribution Analytics**: Built-in analytics for age-based data
- **REST API**: Complete with Swagger/OpenAPI documentation
- **Supabase Support**: Ready for Supabase deployment

## Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL database (Supabase recommended)

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory:

```env
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-password
DB_DATABASE=postgres
CSV_FILE_PATH=./data/users.csv
PORT=3000
```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → Database
3. Copy the connection details to your `.env` file

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/users/upload-csv` | Upload CSV from configured path |
| `GET` | `/users` | Get all users |
| `GET` | `/users/:id` | Get user by ID |
| `GET` | `/statistics/age-distribution` | Get age distribution analytics |
| `GET` | `/api` | Swagger documentation |

### Quick Test Commands

```bash
# Health check
curl http://localhost:3000

# Upload CSV
curl -X POST http://localhost:3000/users/upload-csv

# Get all users
curl http://localhost:3000/users

# Get age statistics
curl http://localhost:3000/statistics/age-distribution
```

## Age Distribution Report

After uploading CSV data, the console displays:

```
==================================================
Age Distribution Report
==================================================
Age-Group            % Distribution
--------------------------------------------------
< 20                 20.0
20 to 40             40.0
40 to 60             30.0
> 60                 10.0
==================================================
```

## Project Structure

```
src/
├── app.module.ts              
├── main.ts                    
├── config/
│   └── configuration.ts       # Configuration factory
├── csv/
│   ├── csv.module.ts          # CSV module
│   ├── csv.service.ts         # CSV service
│   └── parsers/
│       └── csv-parser.ts      # Custom CSV parser
└── users/
    ├── users.module.ts        # Users module
    ├── users.service.ts       # Business logic
    ├── users.controller.ts    # REST endpoints
    ├── entities/
    │   └── user.entity.ts     # TypeORM entity
    └── dto/
        ├── age-distribution.dto.ts
        └── upload-result.dto.ts

data/
└── users.csv                  # Sample CSV file
```

## Key Implementation Highlights

### Custom CSV Parser
- No external dependencies for optimal control and performance
- Handles quoted values and embedded commas correctly
- Supports unlimited nesting depth (e.g., `a.b.c.d.e.f`)
- Memory efficient using Node.js readline interface

### Performance Features
- **Batch Inserts**: Uses TypeORM batch operations for large datasets
- **Streaming Parser**: Memory-efficient parsing using Node.js streams
- **JSONB Storage**: Efficient PostgreSQL JSONB for nested data
- **Error Handling**: Comprehensive error handling and logging

### Architecture
- TypeORM with PostgreSQL and JSONB support
- Swagger/OpenAPI documentation
- Class validation with proper DTOs
- CORS enabled for frontend integration

---

**Built with NestJS, TypeORM, and PostgreSQL**