


import { GoogleGenerativeAI } from '@google/generative-ai';
import Student from '../models/Student'; // Adjust the path as necessary
import dbConnect from './dbConnect'; // Adjust the path as necessary

const apiKey = process.env.GOOGLE_API_KEY;
console.log('in function')


async function findBestPeerMatch(studentDetails) {
  try {
    await dbConnect();

    // Fetch all students from the database
    const students = await Student.find();

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    // Define generation configuration
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'text/plain',
    };

       // Ensure studentDetails.subjects is an array
       const studentSubjects = Array.isArray(studentDetails.subjects) ? studentDetails.subjects.join(', ') : studentDetails.subjects || 'Not provided';
    
       // Ensure that students' subjects are always an array
       const studentsList = students.map(student => ({
         ...student.toObject(),
         subjects: Array.isArray(student.subjects) ? student.subjects.join(', ') : student.subjects || 'Not provided'
       }));
   
       // Start a chat session with the model
       const chatSession = model.startChat({
         generationConfig,
         history: [
           {
             role: 'user',
             parts: [
               { text: "Based on the following student's details and study preferences, identify the most suitable peer from the provided list of students:" },
             ],
           },
           {
             role: 'user',
             parts: [
               { text: `Student Details:\nName: ${studentDetails.name}\nAge: ${studentDetails.age}\nGrade: ${studentDetails.grade}\nSubjects: ${studentSubjects}\nStrengths: ${studentDetails.strengths || 'Not provided'}\nWeaknesses: ${studentDetails.weaknesses || 'Not provided'}\nLearning Styles: ${studentDetails.learningStyles || 'Not provided'}\nAvailability: ${studentDetails.availability || 'Not provided'}` },
             ],
           },
           {
             role: 'user',
             parts: [
               { text: `Students List:\n${studentsList.map(student => `Name: ${student.name}\nAge: ${student.age}\nGrade: ${student.grade}\nSubjects: ${student.subjects}\nStrengths: ${student.strengths || 'Not provided'}\nWeaknesses: ${student.weaknesses || 'Not provided'}\nLearning Styles: ${student.learningStyles || 'Not provided'}\nAvailability: ${student.availability || 'Not provided'}\n\n`).join('')}` },
             ],
           },
         ],
       });

    // Send message to the model and get the response
    const result = await chatSession.sendMessage("");
    const rawResponse = await result.response.text();

    console.log('Raw response from Google Generative AI:', rawResponse);

    // Process response to find the best match
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(rawResponse);
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      parsedResponse = rawResponse; // Keep raw response in case parsing fails
    }

    console.log('Best peer match:', parsedResponse);

    return parsedResponse;
  } catch (error) {
    console.error('Failed to find best peer match', error);
    throw new Error('Failed to find best peer match');
  }
}

export default findBestPeerMatch;

