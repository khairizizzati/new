const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Database configuration
const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'nurkhairiz',
  server: process.env.DB_SERVER || '127.0.0.1',
  database: process.env.DB_NAME || 'assignment2',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  port: 1433,
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Connect to the database
const connectToDatabase = async () => {
  try {
    await sql.connect(config);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    setTimeout(connectToDatabase, 5000);
  }
};

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await sql.query`SELECT * FROM Users WHERE email = ${email}`;
    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.recordset[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'defaultSecretKey', {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const checkUser = await sql.query`SELECT * FROM Users WHERE email = ${email}`;
    if (checkUser.recordset.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await sql.query`INSERT INTO Users (fullName, email, password) 
                    VALUES (${fullName}, ${email}, ${hashedPassword})`;

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during signup:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/api/user', async (req, res) => {
  const { email } = req.query; // Assuming you send the email in the query string
  try {
    const user = await db.query('SELECT fullName FROM Users WHERE email = ?', [email]);
    if (user.length > 0) {
      res.json(user[0]); // Return the first matching user
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// API Route for saving application data
app.post('/api/application', async (req, res) => {
  const {
    companyName,
    companyId,
    addressLine1,
    addressLine2,
    addressLine3,
    country,
    state,
    city,
    postcode,
    description,
  } = req.body;

  try {
    // Connect to SQL Server using the defined config
    let pool = await sql.connect(config); // Use the existing config object

    // Insert data into Applications table
    const query = `
      INSERT INTO Applications (
        companyName, companyId, addressLine1, addressLine2, addressLine3,
        country, state, city, postcode, description
      ) VALUES (
        @companyName, @companyId, @addressLine1, @addressLine2, @addressLine3,
        @country, @state, @city, @postcode, @description
      )
    `;

    // Execute the query with inputs
    await pool.request()
      .input('companyName', sql.VarChar, companyName)
      .input('companyId', sql.VarChar, companyId)
      .input('addressLine1', sql.VarChar, addressLine1)
      .input('addressLine2', sql.VarChar, addressLine2)
      .input('addressLine3', sql.VarChar, addressLine3)
      .input('country', sql.VarChar, country)
      .input('state', sql.VarChar, state)
      .input('city', sql.VarChar, city)
      .input('postcode', sql.VarChar, postcode)
      .input('description', sql.Text, description)
      .query(query);

    // Send success response
    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Database error:', error.message); // Log the error message for debugging
    res.status(500).json({ message: 'Failed to submit application.' });
  }
});
// Example Express.js route
app.get('/api/users', async (req, res) => {
  const { email } = req.query;
  // Fetch user from the database
  const user = await db.query('SELECT fullName FROM Users WHERE email = ?', [email]);
  res.json(user[0]); // Send the user's details
});


// Get a specific application by ID
app.get('/api/application/:id', async (req, res) => {
  const applicationId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM Applications WHERE id = ${id}', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Start the server
app.listen(port, (err) => {
  if (err) {
    console.error(`Failed to start server on port ${port}:`, err.message);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${port}`);
  connectToDatabase();
});


