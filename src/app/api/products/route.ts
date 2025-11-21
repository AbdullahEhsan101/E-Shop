import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { getSession } from '@/lib/auth';
import { z } from 'zod';

const ProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0),
    imageUrl: z.string().optional(),
});

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find({}).sort({ createdAt: -1 });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();

        const result = ProductSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: result.error.errors }, { status: 400 });
        }

        const product = await Product.create(result.data);
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
