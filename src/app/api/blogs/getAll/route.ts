import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/dbConnect';
import { Blog } from '../../../../../models/Blog';
import { User } from '../../../../../models/User';

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const blogs = await Blog.find()
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });

      console.log('Fetched blogs:', blogs);
      
    const blogsWithLikes = blogs.map(blog => ({
      _id: blog._id,
      title: blog.title,
      desc: blog.desc,
      image: blog.image,
      createdBy: blog.createdBy,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      likesCount: blog.likes ? blog.likes.length : 0,
      likedByUser: false,  // since no user is logged in, can't like
    }));

    return NextResponse.json(blogsWithLikes);
  } catch (error) {
    console.error('Fetch blogs error:', error);
    return NextResponse.json({ message: 'Failed to fetch blogs' }, { status: 500 });
  }
}
