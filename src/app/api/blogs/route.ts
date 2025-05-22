import { NextResponse } from 'next/server';

let blogs: { id: number; title: string; desc: string; image: string }[] = [];

export async function GET() {
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  const { title, desc, image } = await req.json();
  const newBlog = { id: Date.now(), title, desc, image };
  blogs.push(newBlog);
  return NextResponse.json({ message: 'Blog added', blog: newBlog }, { status: 201 });
}
