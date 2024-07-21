


import { NextResponse } from 'next/server';
import dbConnect from '../../utils/dbConnect';  // Adjusted path
import Student from '../../models/Student';
import findBestPeerMatch from '../../utils/findBestPeerMatch';

// Function to format response
function formatResponse(responseText) {

  let cleanedText = responseText.replace(/<br\s*\/?>/gi, '\n');
  cleanedText = cleanedText.replace(/<\/?[^>]+(>|$)/g, ""); // Remove all HTML tags

  // Replace multiple newlines with a single newline
  cleanedText = cleanedText.replace(/\n\s*\n/g, '\n\n');

  return cleanedText.trim();
}
export async function POST(req) {
  await dbConnect();
  console.log("db connected route peer")
  try {
    const { studentDetails } = await req.json();
    

    // Validate studentDetails object structure
    console.log('Received student details:', studentDetails);

    // Ensure studentDetails has the expected structure
    if (!studentDetails || typeof studentDetails !== 'object') {
      throw new Error('Invalid student details');
    }

    const students = await Student.find();
   console.log(students)
    const peerMatch = await findBestPeerMatch(studentDetails, students);
    console.log(peerMatch)
    
    // return new Response(JSON.stringify(peerMatch), { status: 200 });
      // Format the response
      const formattedPeerMatch = formatResponse(peerMatch);

      return new Response(JSON.stringify({ message: formattedPeerMatch }), { status: 200 });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}