const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'activity_tracker'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Fetch activities and events
app.get('/api/activities', (req, res) => {
  const sql = `
    SELECT activities.activity_id as activity_id, activities.activity_name, 
           events.event_id as event_id, events.hr, events.min, events.sec, 
           events.event_number, events.event_name, events.confirmation_by, events.status
    FROM activities
    LEFT JOIN events ON activities.activity_id = events.activity_id
    ORDER BY activities.activity_id, events.event_number;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching activities:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Group events by activity
    const activities = results.reduce((acc, row) => {
      const { activity_id, activity_name, ...event } = row;
      const activity = acc.find(a => a.activity_id === activity_id);

      if (activity) {
        activity.events.push(event);
      } else {
        acc.push({
          activity_id,
          activity_name,
          events: [event]
        });
      }

      return acc;
    }, []);

    res.json(activities);
  });
});

// Reset all event statuses
app.post('/api/reset', (req, res) => {
  const sql = 'UPDATE events SET status = false';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error resetting statuses:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ success: true });
  });
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
