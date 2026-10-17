import fs from 'fs';

export default function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n').filter((line) => line.length > 0);
      const studentRows = lines.slice(1);
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

      resolve(fields);
    });
  });
}
