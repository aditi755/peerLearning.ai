

import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_API_KEY;

async function findBestPeerMatch(studentDetails, students) {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'text/plain',
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [
            { text: "Given the student's details and study preferences, identify the most suitable peer from the following list of students:" },
          ],
        },
        {
          role: 'user',
          parts: [
            { text: `Student Details: ${JSON.stringify(studentDetails)}\nStudents List: ${JSON.stringify(students)}` },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage();
    const rawResponse = await result.response.text();

    console.log('Raw response from Google Generative AI:', rawResponse);

    // Process response to find the best match
    // For example, assuming the response is a JSON object with the best match details
    const parsedResponse = JSON.parse(rawResponse);

    console.log('Best peer match:', parsedResponse);

    return parsedResponse;
  } catch (error) {
    console.error('Failed to find best peer match', error);
    throw new Error('Failed to find best peer match');
  }
}

export default findBestPeerMatch;


