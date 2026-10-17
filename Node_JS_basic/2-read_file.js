const fs = require('fs');

function countStudents(path) {
  let content;
  try {
    content = fs.readFileSync(path, 'utf-8');
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  const lines = content.trim().split('\n').filter((line) => line.length > 0);
  if (lines.length <= 1) {
    console.log('Number of students: 0');
    return;
  }

  const studentRows = lines.slice(1);
  console.log(`Number of students: ${studentRows.length}`);

  const fields = {};
  for (const row of studentRows) {
    const data = row.split(',');
    if (data.length >= 4) {
      const firstname = data[0].trim();
      const field = data[3].trim();
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    }
  }

  for (const [field, students] of Object.entries(fields)) {
    console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
  }
}

module.exports = countStudents;
