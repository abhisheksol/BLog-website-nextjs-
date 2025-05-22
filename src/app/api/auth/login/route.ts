import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/dbConnect';
import { User } from '../../../../../models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../../../lib/jwt';

export async function POST(req: Request) {
  await connectDB();
  const { username, password } = await req.json();

  const user = await User.findOne({ username });
  if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

  const token = generateToken(user._id.toString());

  return NextResponse.json({ message: 'Login successful', token });
}
