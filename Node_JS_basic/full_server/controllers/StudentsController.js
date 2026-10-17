import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const dbPath = process.argv[2];

    readDatabase(dbPath)
      .then((fields) => {
        const output = ['This is the list of our students'];
        const sortedFields = Object.keys(fields).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

        for (const field of sortedFields) {
          output.push(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
        }

        return response.status(200).send(output.join('\n'));
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      return response.status(500).send('Major parameter must be CS or SWE');
    }

    const dbPath = process.argv[2];

    return readDatabase(dbPath)
      .then((fields) => {
        const students = fields[major] || [];
        return response.status(200).send(`List: ${students.join(', ')}`);
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }
}

export default StudentsController;
