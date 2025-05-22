// /app/api/blog/like/route.ts

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
    const userId = payload.userId;

    const { blogId } = await req.json();

    if (!blogId) {
      return NextResponse.json({ message: 'Blog ID is required' }, { status: 400 });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Check if user already liked the blog
    const index = blog.likes.findIndex(id => id.toString() === userId);

    if (index === -1) {
      blog.likes.push(userId);
    } else {
      blog.likes.splice(index, 1);
    }

    await blog.save();

    return NextResponse.json({
      message: 'Like toggled',
      likesCount: blog.likes.length,
      likedByUser: index === -1,
    });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid Token or Unauthorized' }, { status: 403 });
  }
}
