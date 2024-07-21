
import dbConnect from '@/app/utils/dbConnect';
import Student from '@/app/models/Student';
import findBestPeerMatch from '@/app/utils/findBestPeerMatch';


export async function POST(req) {
    await dbConnect();
    
    try {
      const { studentDetails } = await req.json();
      const students = await Student.find();
      
      const peerMatch = await findBestPeerMatch(studentDetails, students);
      
      return new Response(JSON.stringify(peerMatch), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
