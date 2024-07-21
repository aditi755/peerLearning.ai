


// models/Student.js
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  subjects: { type: [String], required: true },
  grade: { type: String, required: true },
  studyPreferences: { type: String, required: true },
  // Add more fields if necessary
});

export default mongoose.models.Student || mongoose.model('Student', studentSchema);
