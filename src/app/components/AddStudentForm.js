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
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={studentDetails.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={studentDetails.age}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="subjects"
          placeholder="Subjects"
          value={studentDetails.subjects}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={studentDetails.grade}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="studyPreferences"
          placeholder="Study Preferences"
          value={studentDetails.studyPreferences}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Student
        </button>
      </form>
    </div>
  );
}
