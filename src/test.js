const xlsx = require('xlsx');
const { Client } = require('pg');

// Read the Excel file
const filePath = 'path_to_your_file.xlsx';
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert the worksheet to JSON
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// PostgreSQL connection details
const client = new Client({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database_name',
  password: 'your_password',
  port: 'your_port',
});

// Connect to PostgreSQL
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    // Iterate through the JSON data and insert into PostgreSQL
    jsonData.forEach(async (row) => {
      const { product_id, product_name, cis_benchmarks_status, stig_benchmark_status } = row;
      const query = `
        INSERT INTO products (product_id, product_name, cis_benchmarks_status, stig_benchmark_status)
        VALUES ($1, $2, $3, $4)
      `;
      try {
        await client.query(query, [product_id, product_name, cis_benchmarks_status, stig_benchmark_status]);
        console.log(`Inserted row: ${product_id}`);
      } catch (err) {
        console.error(`Error inserting row: ${product_id}`, err.stack);
      }
    });
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL', err.stack);
  })
  .finally(() => {
    // End the connection after all inserts are done
    setTimeout(() => {
      client.end();
    }, 5000); // Adjust the timeout as needed to ensure all data is inserted
  });
