import { useState } from 'react';


export default function AddStudentForm({ onAddStudent }) {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    age: '',
    subjects: '',
    grade: '',
    studyPreferences: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentDetails }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      onAddStudent(data);
      setStudentDetails({
        name: '',
        age: '',
        subjects: '',
        grade: '',
        studyPreferences: '',
      });
    } catch (err) {
      console.error('Failed to add student:', err);
    }
  };

  return (
    <div>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={studentDetails.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={studentDetails.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subjects"
          placeholder="Subjects"
          value={studentDetails.subjects}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={studentDetails.grade}
          onChange={handleChange}
          required
        />
        <textarea
          name="studyPreferences"
          placeholder="Study Preferences"
          value={studentDetails.studyPreferences}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
