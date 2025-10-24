const fs = require('fs');
const path = require('path');

const firstNames = [
    'Rohit', 'Priya', 'Amit', 'Sneha', 'Rajesh', 'Anita', 'Vikram', 'Deepika', 'Arjun', 'Kavita',
    'Ravi', 'Sunita', 'Manoj', 'Pooja', 'Suresh', 'Meera', 'Ashok', 'Sita', 'Kiran', 'Radha',
    'Anil', 'Geeta', 'Vinod', 'Lata', 'Ramesh', 'Usha', 'Satish', 'Neha', 'Prakash', 'Shobha',
    'Dilip', 'Rekha', 'Mukesh', 'Kavya', 'Naresh', 'Sapna', 'Ajay', 'Nisha', 'Mahesh', 'Ritu'
];

const lastNames = [
    'Prasad', 'Sharma', 'Kumar', 'Patel', 'Verma', 'Singh', 'Reddy', 'Joshi', 'Mehta', 'Nair',
    'Gupta', 'Agarwal', 'Yadav', 'Mishra', 'Tiwari', 'Dubey', 'Pandey', 'Srivastava', 'Shukla', 'Tripathi',
    'Saxena', 'Bansal', 'Mittal', 'Jain', 'Shah', 'Gandhi', 'Chopra', 'Kapoor', 'Malhotra', 'Arora'
];

const addressLines1 = [
    'A-563 Rakshak Society', 'B-101 Green Park', 'C-205 Lakeview', 'D-12 Riverdale', 'E-301 Sunshine Apartments',
    'F-45 Palm Grove', 'G-789 Heritage Complex', 'H-56 Modern Heights', 'I-234 Sunset Plaza', 'J-678 Ocean View',
    'K-90 Golden Heights', 'L-456 Silver Towers', 'M-123 Diamond Plaza', 'N-789 Pearl Residency', 'O-321 Ruby Manor',
    'P-654 Emerald Gardens', 'Q-987 Sapphire Homes', 'R-147 Crystal Palace', 'S-258 Lotus Apartments', 'T-369 Rose Villa'
];

const addressLines2 = [
    'New Pune Road', 'MG Road', 'Whitefield', 'SG Highway', 'Banjara Hills',
    'Anna Nagar', 'Jubilee Hills', 'Koramangala', 'Andheri West', 'Marine Drive',
    'Electronic City', 'Malviya Nagar', 'Sector 18', 'Salt Lake', 'Gomti Nagar',
    'Civil Lines', 'Model Town', 'Lajpat Nagar', 'Rajouri Garden', 'Karol Bagh'
];

const cities = [
    'Pune', 'Mumbai', 'Bangalore', 'Ahmedabad', 'Hyderabad', 'Chennai', 'Kochi',
    'Delhi', 'Kolkata', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Pimpri', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
    'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan', 'Vasai', 'Varanasi'
];

const states = [
    'Maharashtra', 'Karnataka', 'Gujarat', 'Telangana', 'Tamil Nadu', 'Kerala',
    'Delhi', 'West Bengal', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh',
    'Punjab', 'Haryana', 'Andhra Pradesh', 'Odisha', 'Assam', 'Bihar', 'Jharkhand'
];

const genders = ['male', 'female'];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomAge() {
    const rand = Math.random();
    if (rand < 0.05) return Math.floor(Math.random() * 5) + 15; // 15-19 (5%)
    if (rand < 0.35) return Math.floor(Math.random() * 20) + 20; // 20-39 (30%)
    if (rand < 0.75) return Math.floor(Math.random() * 20) + 40; // 40-59 (40%)
    if (rand < 0.95) return Math.floor(Math.random() * 10) + 60; // 60-69 (20%)
    return Math.floor(Math.random() * 10) + 70; // 70-79 (5%)
}

function generatePhoneNumber() {
    return '98765' + String(Math.floor(Math.random() * 100000)).padStart(5, '0');
}

function generateLandlineNumber(city) {
    const areaCodes = {
        'Mumbai': '022',
        'Delhi': '011',
        'Bangalore': '080',
        'Chennai': '044',
        'Kolkata': '033',
        'Pune': '020',
        'Hyderabad': '040',
        'Ahmedabad': '079',
        'Kochi': '0484'
    };

    const areaCode = areaCodes[city] || '0' + String(Math.floor(Math.random() * 999) + 100);
    const number = String(Math.floor(Math.random() * 90000000) + 10000000);
    return `${areaCode}-${number}`;
}

function generateCSVRecord() {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const age = getRandomAge();
    const addressLine1 = getRandomElement(addressLines1);
    const addressLine2 = getRandomElement(addressLines2);
    const city = getRandomElement(cities);
    const state = getRandomElement(states);
    const gender = getRandomElement(genders);
    const mobile = generatePhoneNumber();
    const home = generateLandlineNumber(city);

    return [firstName, lastName, age, addressLine1, addressLine2, city, state, gender, mobile, home];
}

async function generateLargeCSV(recordCount = 50000) {
    console.log(`Generating ${recordCount.toLocaleString()} records...`);

    const filePath = path.join(__dirname, 'data', 'users_large.csv');

    const dataDir = path.dirname(filePath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    const writeStream = fs.createWriteStream(filePath);

    const header = 'name.firstName,name.lastName,age,address.line1,address.line2,address.city,address.state,gender,phone.mobile,phone.home\n';
    writeStream.write(header);

    const batchSize = 1000;
    let recordsGenerated = 0;

    for (let batch = 0; batch < Math.ceil(recordCount / batchSize); batch++) {
        const currentBatchSize = Math.min(batchSize, recordCount - recordsGenerated);
        let batchData = '';

        for (let i = 0; i < currentBatchSize; i++) {
            const record = generateCSVRecord();
            batchData += record.join(',') + '\n';
            recordsGenerated++;
        }

        writeStream.write(batchData);

        const progress = ((recordsGenerated / recordCount) * 100).toFixed(1);
        process.stdout.write(`\rProgress: ${progress}% (${recordsGenerated.toLocaleString()}/${recordCount.toLocaleString()} records)`);
    }

    writeStream.end();

    return new Promise((resolve, reject) => {
        writeStream.on('finish', () => {
            console.log(`\n Successfully generated ${recordsGenerated.toLocaleString()} records`);
            console.log(`File saved: ${filePath}`);

            const stats = fs.statSync(filePath);
            const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
            console.log(`File size: ${fileSizeInMB} MB`);

            resolve(filePath);
        });

        writeStream.on('error', reject);
    });
}

async function testCSVGeneration() {
    console.log('📈 CSV Generation Performance Test\n');

    const testSizes = [1000, 10000, 50000];

    for (const size of testSizes) {
        console.log(`\n🧪 Testing ${size.toLocaleString()} records:`);
        const startTime = Date.now();

        try {
            await generateLargeCSV(size);
            const endTime = Date.now();
            const duration = (endTime - startTime) / 1000;
            const recordsPerSecond = Math.round(size / duration);

            console.log(`Generation time: ${duration.toFixed(2)} seconds`);
            console.log(`Speed: ${recordsPerSecond.toLocaleString()} records/second`);
        } catch (error) {
            console.error(`Error generating ${size} records:`, error.message);
        }
    }
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'test':
            await testCSVGeneration();
            break;

        case 'generate':
            const recordCount = parseInt(args[1]) || 50000;
            await generateLargeCSV(recordCount);
            break;

        default:
            console.log('CSV Generator Usage:');
            console.log('');
            console.log('Generate 50K records (default):');
            console.log('  node generate-large-csv.js generate');
            console.log('');
            console.log('Generate custom number of records:');
            console.log('  node generate-large-csv.js generate 100000');
            console.log('');
            console.log('Run performance test:');
            console.log('  node generate-large-csv.js test');
            console.log('');

            // Default: generate 50K records
            await generateLargeCSV(50000);
    }
}

// Run the script
if (require.main === module) {
    main().catch(error => {
        console.error('Script failed:', error);
        process.exit(1);
    });
}

module.exports = { generateLargeCSV };