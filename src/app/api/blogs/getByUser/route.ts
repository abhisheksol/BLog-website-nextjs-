import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/dbConnect';
import { Blog } from '../../../../../models/Blog';
import { verifyToken } from '../../../../../lib/jwt';

export async function GET(req: NextRequest) {
  await connectDB();

  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyToken(token) as any;
    const userId = payload.userId;

    const userBlogs = await Blog.find({ createdBy: userId }).sort({ createdAt: -1 });
    return NextResponse.json(userBlogs);
  } catch (error) {
    return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
  }
}
