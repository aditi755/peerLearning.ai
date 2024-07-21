
// import dbConnect from '@/app/utils/dbConnect';
// import Student from '@/app/models/Student';
// import findBestPeerMatch from '@/app/utils/findBestPeerMatch';

import { NextResponse } from 'next/server';
import dbConnect from '../../utils/dbConnect';  // Adjusted path
import Student from '../../models/Student';
import findBestPeerMatch from '../../utils/findBestPeerMatch';

// export async function POST(req) {
//     await dbConnect();
    
//     try {
//       const { studentDetails } = await req.json();
//       const students = await Student.find();
      
//       const peerMatch = await findBestPeerMatch(studentDetails, students);
      
//       return new Response(JSON.stringify(peerMatch), { status: 200 });
//     } catch (error) {
//       return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//     }
//   }


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
    return new Response(JSON.stringify(peerMatch), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}