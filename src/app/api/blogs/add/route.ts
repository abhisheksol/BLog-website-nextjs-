import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/dbConnect';
import { Blog } from '../../../../../models/Blog';
import { verifyToken } from '../../../../../lib/jwt';

export async function POST(req: NextRequest) {
  await connectDB();
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyToken(token) as any;
    // console.log(payload);
    
    const userId = payload.userId;

    const { title, desc, image } = await req.json();
    const blog = await Blog.create({ title, desc, image, createdBy: userId });

    return NextResponse.json({ message: 'Blog created', blog });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
  }
}
