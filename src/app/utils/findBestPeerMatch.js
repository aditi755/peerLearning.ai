

// import { GoogleGenerativeAI } from '@google/generative-ai';

// const apiKey = process.env.GOOGLE_API_KEY;

// async function findBestPeerMatch(studentDetails, students) {
//   try {
//     const genAI = new GoogleGenerativeAI(apiKey);
//     const model = genAI.getGenerativeModel({
//       model: 'gemini-1.5-flash',
//     });

//     const generationConfig = {
//       temperature: 1,
//       topP: 0.95,
//       topK: 64,
//       maxOutputTokens: 8192,
//       responseMimeType: 'text/plain',
//     };

//     const chatSession = model.startChat({
//       generationConfig,
//       history: [
//         {
//           role: 'user',
//           parts: [
//             { text: "Given the student's details and study preferences, identify the most suitable peer from the following list of students:" },
//           ],
//         },
//         {
//           role: 'user',
//           parts: [
//             { text: `Student Details: ${JSON.stringify(studentDetails)}\nStudents List: ${JSON.stringify(students)}` },
//           ],
//         },
//       ],
//     });

//     const result = await chatSession.sendMessage();
//     const rawResponse = await result.response.text();

//     console.log('Raw response from Google Generative AI:', rawResponse);

//     // Process response to find the best match
//     // For example, assuming the response is a JSON object with the best match details
//     const parsedResponse = JSON.parse(rawResponse);

//     console.log('Best peer match:', parsedResponse);

//     return parsedResponse;
//   } catch (error) {
//     console.error('Failed to find best peer match', error);
//     throw new Error('Failed to find best peer match');
//   }
// }

// export default findBestPeerMatch;


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

    // // Ensure studentDetails.subjects is an array
    // const subjects = Array.isArray(studentDetails.subjects) ? studentDetails.subjects.join(', ') : 'Not provided';
    
    // // Start a chat session with the model
    // const chatSession = model.startChat({
    //   generationConfig,
    //   history: [
    //     {
    //       role: 'user',
    //       parts: [
    //         { text: "Based on the following student's details and study preferences, identify the most suitable peer from the provided list of students:" },
    //       ],
    //     },
    //     {
    //       role: 'user',
    //       parts: [
    //         { text: `Student Details:\nName: ${studentDetails.name}\nAge: ${studentDetails.age}\nGrade: ${studentDetails.grade}\nSubjects: ${subjects}\nStrengths: ${studentDetails.strengths.join(', ')}\nWeaknesses: ${studentDetails.weaknesses.join(', ')}\nLearning Styles: ${studentDetails.learningStyles.join(', ')}\nAvailability: ${studentDetails.availability.join(', ')}` },
    //       ],
    //     },
    //     {
    //       role: 'user',
    //       parts: [
    //         { text: `Students List:\n${students.map(student => `Name: ${student.name}\nAge: ${student.age}\nGrade: ${student.grade}\nSubjects: ${student.subjects.join(', ')}\nStrengths: ${student.strengths.join(', ')}\nWeaknesses: ${student.weaknesses.join(', ')}\nLearning Styles: ${student.learningStyles.join(', ')}\nAvailability: ${student.availability.join(', ')}\n\n`).join('')}` },
    //       ],
    //     },
    //   ],
    // });

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

// async function findBestPeerMatch(studentDetails) {
//   try {
//     await dbConnect();

//     // Fetch all students from the database
//     const students = await Student.find();

//     // Initialize Google Generative AI
//     const genAI = new GoogleGenerativeAI(apiKey);
//     const model = genAI.getGenerativeModel({
//       model: 'gemini-1.5-flash',
//     });

//     // Define generation configuration
//     const generationConfig = {
//       temperature: 1,
//       topP: 0.95,
//       topK: 64,
//       maxOutputTokens: 8192,
//       responseMimeType: 'text/plain',
//     };

//     // Start a chat session with the model
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [
//         {
//           role: 'user',
//           parts: [
//             { text: "Based on the following student's details and study preferences, identify the most suitable peer from the provided list of students:" },
//           ],
//         },
//         {
//           role: 'user',
//           parts: [
//             { text: `Student Details:\nName: ${studentDetails.name}\nAge: ${studentDetails.age}\nGrade: ${studentDetails.grade}\nSubjects: ${studentDetails.subjects.join(', ')}\nStrengths: ${studentDetails.strengths.join(', ')}\nWeaknesses: ${studentDetails.weaknesses.join(', ')}\nLearning Styles: ${studentDetails.learningStyles.join(', ')}\nAvailability: ${studentDetails.availability.join(', ')}` },
//           ],
//         },
//         {
//           role: 'user',
//           parts: [
//             { text: `Students List:\n${students.map(student => `Name: ${student.name}\nAge: ${student.age}\nGrade: ${student.grade}\nSubjects: ${student.subjects.join(', ')}\nStrengths: ${student.strengths.join(', ')}\nWeaknesses: ${student.weaknesses.join(', ')}\nLearning Styles: ${student.learningStyles.join(', ')}\nAvailability: ${student.availability.join(', ')}\n\n`).join('')}` },
//           ],
//         },
//       ],
//     });

//     // Send message to the model and get the response
//     const result = await chatSession.sendMessage("");
//     const rawResponse = await result.response.text();

//     console.log('Raw response from Google Generative AI:', rawResponse);

//     // Process response to find the best match
//     const parsedResponse = JSON.parse(rawResponse);
//     console.log('Best peer match:', parsedResponse);

//     return parsedResponse;
//   } catch (error) {
//     console.error('Failed to find best peer match', error);
//     throw new Error('Failed to find the best peer match');
//   }
// }

// export default findBestPeerMatch;

// async function findBestPeerMatch(studentDetails, students) {
//   try {
//     await dbConnect();

//     const genAI = new GoogleGenerativeAI(apiKey);
//     console.log('db si connect and api is provided')
//     const model = genAI.getGenerativeModel({
//       model: 'gemini-1.5-flash',
//     });

//     const generationConfig = {
//       temperature: 1,
//       topP: 0.95,
//       topK: 64,
//       maxOutputTokens: 8192,
//       responseMimeType: 'text/plain',
//     };

//     console.log('started session')

//     const chatSession = model.startChat({
//       generationConfig,
//       history: [
//         {
//           role: 'user',
//           parts: [
//             { text: "Based on the following student's details and study preferences, identify the most suitable peer from the provided list of students:" },
//           ],
//         },
//         {
//           role: 'user',
//           parts: [
//             { text: `Student Details:\n${JSON.stringify(studentDetails, null, 2)}` },
//           ],
//         },
//         {
//           role: 'user',
//           parts: [
//             { text: `Students List:\n${JSON.stringify(students, null, 2)}` },
//           ],
//         },
//       ],
//     });
     
//     console.log('send req')
//     const result = await chatSession.sendMessage("");
//     console.log(result)
//     const rawResponse = await result.response.text();

//     console.log('Raw response from Google Generative AI:', rawResponse);

//     // Process response to find the best match
//     const parsedResponse = JSON.parse(rawResponse);
//     console.log('Best peer match:', parsedResponse);

//     return parsedResponse;
//   } catch (error) {
//     console.error('Failed to find best peer match', error);
//     throw new Error('Failed to find best peer match');
//   }
// }

// export default findBestPeerMatch;


