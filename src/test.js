const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/download-json', (req, res) => {
  const data = {
    name: 'John Doe',
    age: 30,
    occupation: 'Software Developer'
  };

  const filePath = path.join(__dirname, 'data.json');

  // Write data to a file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  // Set headers for file download
  res.setHeader('Content-Disposition', 'attachment; filename=data.json');
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
    }
  });
});
