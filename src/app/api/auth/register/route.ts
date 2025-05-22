import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/dbConnect';
import { User } from '../../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await connectDB();
  const { username, password } = await req.json();

  const existingUser = await User.findOne({ username });
  if (existingUser) return NextResponse.json({ message: 'User already exists' }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, password: hashedPassword });

  return NextResponse.json({ message: 'User registered', user: newUser });
}
