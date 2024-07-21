

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

  return (
    <div>
      <h1>Peer Tutoring Platform</h1>
      <AddStudentForm onAddStudent={handleAddStudent} />

      <h2>Find Peer Match</h2>
      <form onSubmit={handleStudentDetailsSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={studentDetails.name}
          onChange={handleStudentDetailsChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={studentDetails.age}
          onChange={handleStudentDetailsChange}
          required
        />
        <input
          type="text"
          name="subjects"
          placeholder="Subjects"
          value={studentDetails.subjects}
          onChange={handleStudentDetailsChange}
          required
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={studentDetails.grade}
          onChange={handleStudentDetailsChange}
          required
        />
        <textarea
          name="studyPreferences"
          placeholder="Study Preferences"
          value={studentDetails.studyPreferences}
          onChange={handleStudentDetailsChange}
          required
        />
        <button type="submit">Find Peer Match</button>
      </form>

      <h2>All Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <strong>Name:</strong> {student.name}<br />
            <strong>Age:</strong> {student.age}<br />
            <strong>Subjects to study:</strong> {(student.subjects || []).join(', ')}<br />
            <strong>Strengths:</strong> {(student.strengths || []).join(', ')}<br />
            <strong>Weaknesses:</strong> {(student.weaknesses || []).join(', ')}<br />
            <strong>Grade:</strong> {student.grade}<br />
            <strong>Study Preferences:</strong> {student.studyPreferences}<br />
          </li>
        ))}
      </ul>

      {peerMatch && (
        <div>
          <h3>Best Peer Match</h3>
          <div>
            {parseMessage(peerMatch.message)}
          </div>
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

