import { NextResponse } from 'next/server';
import dbConnect from '@/app/utils/dbConnect';  
import Student from '@/app/models/Student';     



export async function GET() {
    await dbConnect();
    
    try {
      const students = await Student.find();
      return new Response(JSON.stringify(students), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }