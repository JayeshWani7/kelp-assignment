# CSV to JSON Converter API# CSV to JSON Converter API



A NestJS application that processes CSV files and converts them to JSON format with PostgreSQL storage.A NestJS application that processes CSV files and converts them to JSON format with PostgreSQL storage.



## Features## Features



- Custom CSV parser (no external libraries)- Custom CSV parser (no external libraries)

- Support for nested JSON via dot-notation headers- Support for nested JSON via dot-notation headers

- PostgreSQL integration with JSONB fields- PostgreSQL integration with JSONB fields

- Age distribution analytics- Age distribution analytics

- REST API with Swagger documentation- REST API with Swagger documentation

- Supabase database support- Supabase database support



## Prerequisites## Prerequisites



- Node.js (v16+)- Node.js (v16+)

- npm or yarn- npm or yarn

- PostgreSQL database (Supabase recommended)- PostgreSQL database (Supabase recommended)



## Installation## Installation



```bash```bash

npm installnpm install

```

npm install @nestjs/config[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Configuration

npm install class-validator class-transformer

Create a `.env` file in the root directory:

npm install @nestjs/swagger## Project setup

```env

DB_HOST=your-db-host```

DB_PORT=5432

DB_USERNAME=postgres```bash

DB_PASSWORD=your-password

DB_DATABASE=postgres## 🗄️ Supabase Setup$ npm install

CSV_FILE_PATH=./data/users.csv

PORT=3000```

```

1. **Create a Supabase project:**

For Supabase:

1. Create a new project at https://supabase.com   - Go to [supabase.com](https://supabase.com)## Compile and run the project

2. Go to Project Settings → Database

3. Copy the connection details to your `.env` file   - Create a new project



## Running the Application   - Wait for project initialization```bash



```bash# development

# Development

npm run start:dev **Get your database credentials:**$ npm run start



# Production   - Go to Project Settings → Database

npm run build

npm run start:prod   - Copy the connection details# watch mode

```

$ npm run start:dev

## API Endpoints

3. **Update `.env` file:**

| Method | Endpoint | Description |

|--------|----------|-------------|```env# production mode

| `GET` | `/` | Health check |

| `POST` | `/users/upload-csv` | Upload CSV from configured path |# Replace with your actual Supabase details$ npm run start:prod

| `GET` | `/users` | Get all users |

| `GET` | `/users/:id` | Get user by ID |DB_HOST=your-project-ref.supabase.co```

| `GET` | `/statistics/age-distribution` | Get age distribution analytics |

| `GET` | `/api` | Swagger documentation |DB_PORT=5432



## CSV FormatDB_USERNAME=postgres## Run tests



The application supports nested properties using dot notation:DB_PASSWORD=your-supabase-password



```csvDB_DATABASE=postgres```bash

name.firstName,name.lastName,age,address.line1,address.city,address.state,gender,phone.mobile,phone.home

Rohit,Prasad,35,A-563 Rakshak Society,Pune,Maharashtra,male,9876543210,020-12345678CSV_FILE_PATH=./data/users.csv# unit tests

```

PORT=3000$ npm run test

This transforms to:

```

```json

{# e2e tests

  "id": 1,

  "name": "Rohit Prasad", ## 🏃‍♂️ Running the Application$ npm run test:e2e

  "age": 35,

  "address": {

    "line1": "A-563 Rakshak Society",

    "city": "Pune",```bash# test coverage

    "state": "Maharashtra"

  },# Development mode$ npm run test:cov

  "additionalInfo": {

    "gender": "male",npm run start:dev```

    "phone": {

      "mobile": "9876543210",

      "home": "020-12345678"

    }# Production build## Deployment

  }

}npm run build

```

npm run start:prodWhen you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

## Testing

```

```bash

# Unit testsIf you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

npm run test

## 📚 API Endpoints

# E2E tests

npm run test:e2e```bash



# Quick API tests### Base URL: `http://localhost:3000`$ npm install -g @nestjs/mau

curl http://localhost:3000

curl -X POST http://localhost:3000/users/upload-csv$ mau deploy

curl http://localhost:3000/users

curl http://localhost:3000/statistics/age-distribution| Method | Endpoint | Description |```

```

|--------|----------|-------------|

## Project Structure

| `GET` | `/` | Health check |With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

```

src/| `POST` | `/users/upload-csv` | Upload CSV from configured path |

├── app.module.ts

├── main.ts| `GET` | `/users` | Get all users |## Resources

├── config/

│   └── configuration.ts| `GET` | `/users/:id` | Get user by ID |

├── csv/

│   ├── csv.module.ts| `GET` | `/statistics/age-distribution` | Get age distribution analytics |Check out a few resources that may come in handy when working with NestJS:

│   ├── csv.service.ts

│   └── parsers/| `GET` | `/api` | Swagger documentation |

│       └── csv-parser.ts

└── users/- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

    ├── users.module.ts

    ├── users.service.ts## 📄 CSV Format- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).

    ├── users.controller.ts

    ├── entities/- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).

    │   └── user.entity.ts

    └── dto/The application supports nested properties using dot notation:- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.

        ├── age-distribution.dto.ts

        └── upload-result.dto.ts- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).

```

```csv- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).

## Age Distribution Report

name.firstName,name.lastName,age,address.line1,address.city,address.state,gender,phone.mobile,phone.home- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).

After uploading CSV data, the console displays an age distribution report:

Rohit,Prasad,35,A-563 Rakshak Society,Pune,Maharashtra,male,9876543210,020-12345678- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

```

==================================================```

Age Distribution Report

==================================================## Support

Age-Group            % Distribution

--------------------------------------------------**Transformed JSON:**

< 20                 20.0

20 to 40             40.0```jsonNest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

40 to 60             30.0

> 60                 10.0{

==================================================

```  "id": 1,## Stay in touch

  "name": "Rohit Prasad",

  "age": 35,- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)

  "address": {- Website - [https://nestjs.com](https://nestjs.com/)

    "line1": "A-563 Rakshak Society",- Twitter - [@nestframework](https://twitter.com/nestframework)

    "city": "Pune",

    "state": "Maharashtra"## License

  },

  "additionalInfo": {Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

    "gender": "male",
    "phone": {
      "mobile": "9876543210",
      "home": "020-12345678"
    }
  }
}
```

## 🧪 Testing

### Quick Test Commands

```bash
# Health check
curl http://localhost:3000

# Upload CSV
curl -X POST http://localhost:3000/users/upload-csv

# Get users
curl http://localhost:3000/users

# Get statistics
curl http://localhost:3000/statistics/age-distribution
```

## 🏗️ Project Structure

```
src/
├── app.module.ts              # Main application module
├── main.ts                    # Application entry point
├── config/
│   └── configuration.ts       # Configuration factory
├── csv/
│   ├── csv.module.ts          # CSV module
│   ├── csv.service.ts         # CSV service
│   └── parsers/
│       └── csv-parser.ts      # Custom CSV parser (no external deps)
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

## ⚡ Performance Features

- **Batch Inserts**: Uses TypeORM batch operations for large datasets
- **Streaming Parser**: Memory-efficient parsing using Node.js streams
- **Custom Parser**: No external CSV dependencies for optimal control
- **JSONB Storage**: Efficient PostgreSQL JSONB for nested data
- **Error Handling**: Comprehensive error handling and logging

## 📈 Console Output

After successful CSV upload, you'll see an age distribution report:

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

## 🎯 Key Implementation Highlights

### Custom CSV Parser
- **No external dependencies** - built for optimal control and performance
- **Handles quoted values** and embedded commas correctly
- **Supports unlimited nesting depth** (e.g., `a.b.c.d.e.f`)
- **Memory efficient** using Node.js readline interface

### Production Ready Architecture
- **TypeORM** with PostgreSQL and JSONB support
- **Swagger/OpenAPI** documentation
- **Class validation** with proper DTOs
- **Structured logging** and error handling
- **CORS** enabled for frontend integration

## 🎉 Getting Started

1. **Set up Supabase database** and update `.env` file
2. **Run the application:** `npm run start:dev`
3. **Visit API docs:** `http://localhost:3000/api`
4. **Upload CSV:** `POST http://localhost:3000/users/upload-csv`
5. **View results:** `GET http://localhost:3000/users`

---

**Built with ❤️ using NestJS, TypeORM, and PostgreSQL**