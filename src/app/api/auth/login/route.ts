import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { encrypt } from '@/lib/auth';
import { z } from 'zod';
import { cookies } from 'next/headers';

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const result = LoginSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: result.error.errors }, { status: 400 });
        }

        const { email, password } = result.data;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const session = await encrypt({ user: { id: user._id, email: user.email, name: user.name, role: user.role }, expires });

        const cookieStore = await cookies();
        cookieStore.set('session', session, { expires, httpOnly: true });

        return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
