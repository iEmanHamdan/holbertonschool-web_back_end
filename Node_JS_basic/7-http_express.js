const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;
const DB_PATH = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n').filter((line) => line.length > 0);
      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      const studentRows = lines.slice(1);
      const output = [`Number of students: ${studentRows.length}`];

      const fields = {};
      for (const row of studentRows) {
        const student = row.split(',');
        if (student.length >= 4) {
          const firstname = student[0].trim();
          const field = student[3].trim();
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstname);
        }
      }

      for (const [field, students] of Object.entries(fields)) {
        output.push(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
      }

      resolve(output.join('\n'));
    });
  });
}

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.set('Content-Type', 'text/plain');
  countStudents(DB_PATH)
    .then((data) => {
      res.send(`This is the list of our students\n${data}`);
    })
    .catch((err) => {
      res.send(`This is the list of our students\n${err.message}`);
    });
});

app.listen(PORT);

module.exports = app;
