const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // serve static files (index.html, css, js)

// API endpoint to handle form submissions
app.post('/api/apply', (req, res) => {
  const { name, phone, email, service, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }

  // Save to a simple log file (or you can integrate with email/DB)
  const logEntry = `[${new Date().toISOString()}] Name: ${name}, Phone: ${phone}, Email: ${email || 'N/A'}, Service: ${service}, Message: ${message || 'N/A'}\n`;
  const logPath = path.join(__dirname, 'applications.log');

  fs.appendFile(logPath, logEntry, (err) => {
    if (err) {
      console.error('Failed to write log:', err);
      return res.status(500).json({ error: 'Server error saving application.' });
    }
    res.status(200).json({ message: 'Application saved successfully!' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ BZI Travel server running at http://localhost:${PORT}`);
});
