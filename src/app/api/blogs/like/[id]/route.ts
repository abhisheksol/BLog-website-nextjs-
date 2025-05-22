import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../../lib/dbConnect';
import { Blog } from '../../../../../../models/Blog';
import { verifyToken } from '../../../../../../lib/jwt';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const blogId = params.id;
    const authHeader = req.headers.get('authorization') || '';

    if (!authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token) as any;
    const userId = payload.userId;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Initialize likes array if it doesn't exist
    if (!blog.likes) {
      blog.likes = [];
    }

    const alreadyLiked = blog.likes.includes(userId);
    if (alreadyLiked) {
      blog.likes = blog.likes.filter(id => id.toString() !== userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    return NextResponse.json({
      message: alreadyLiked ? 'Unliked' : 'Liked',
      likesCount: blog.likes.length,
      likedByUser: !alreadyLiked,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating like' }, { status: 500 });
  }
}
