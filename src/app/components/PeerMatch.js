

'use client';
import { useState, useEffect } from 'react';
import AddStudentForm from './AddStudentForm';

export default function PeerMatchForm() {
  const [students, setStudents] = useState([]);
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    age: '',
    subjects: '',
    grade: '',
    studyPreferences: '',
  });
  const [peerMatch, setPeerMatch] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/get-students');
        const data = await response.json();
        if (response.ok) {
          setStudents(data);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error('Failed to fetch students:', err);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentDetailsChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleStudentDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/find-peer-match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentDetails }),
      });

      const data = await response.json();
      if (response.ok) {
        setPeerMatch(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to find peer match');
    }
  };

  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

 


  // Function to parse and clean the peer match message
  const parseMessage = (message) => {
    // Remove markdown-style bold indicators (**)
    const cleanedMessage = message.replace(/\*\*/g, '');
    const lines = cleanedMessage.split('\n').filter(line => line.trim() !== '');
    return lines.map((line, index) => {
      if (line.startsWith('* ')) {
        return <li key={index}>{line.slice(2)}</li>;
      }
      return <p key={index}>{line}</p>;
    });
  };

//  

return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Peer Tutoring Platform</h1>
      <AddStudentForm onAddStudent={handleAddStudent} />

      <h2 className="text-2xl font-semibold mt-8 mb-4">Find Peer Match</h2>
      <form onSubmit={handleStudentDetailsSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={studentDetails.name}
          onChange={handleStudentDetailsChange}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={studentDetails.age}
          onChange={handleStudentDetailsChange}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="subjects"
          placeholder="Subjects"
          value={studentDetails.subjects}
          onChange={handleStudentDetailsChange}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={studentDetails.grade}
          onChange={handleStudentDetailsChange}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <textarea
          name="studyPreferences"
          placeholder="Study Preferences"
          value={studentDetails.studyPreferences}
          onChange={handleStudentDetailsChange}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Find Peer Match
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-8 mb-4">All Students</h2>
      <ul className="space-y-4">
        {students.map((student) => (
          <li key={student._id} className="p-4 bg-white border border-gray-300 rounded shadow-md">
            <div><strong>Name:</strong> {student.name}</div>
            <div><strong>Age:</strong> {student.age}</div>
            <div><strong>Subjects to study:</strong> {(student.subjects || []).join(', ')}</div>
            <div><strong>Strengths:</strong> {(student.strengths || []).join(', ')}</div>
            <div><strong>Weaknesses:</strong> {(student.weaknesses || []).join(', ')}</div>
            <div><strong>Grade:</strong> {student.grade}</div>
            <div><strong>Study Preferences:</strong> {student.studyPreferences}</div>
            <button className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600">
              Message {student.name}
            </button>
          </li>
        ))}
      </ul>

      {peerMatch && (
        <div className="mt-8 p-4 bg-white border border-gray-300 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2">Best Peer Match</h3>
          <div>
            {parseMessage(peerMatch.message)}
          </div>
        </div>
      )}

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
}

