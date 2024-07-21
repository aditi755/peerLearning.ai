import { NextResponse } from 'next/server';
import dbConnect from '@/app/utils/dbConnect'; 
import Student from '@/app/models/Student';     

export async function POST(req) {
    await dbConnect();
    
    try {
      const { studentDetails } = await req.json();
      const newStudent = new Student(studentDetails);
      await newStudent.save();
      return new Response(JSON.stringify(newStudent), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
