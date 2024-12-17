// File: /app/api/delete-image/route.ts
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req: NextRequest) {
    try {
        const { public_id } = await req.json();
        
        if (!public_id) {
            return NextResponse.json(
                { error: "Public ID is required" },
                { status: 400 }
            );
        }

        const result = await cloudinary.uploader.destroy(public_id);
        
        if (result.result === 'ok') {
            return NextResponse.json({ success: true, result });
        } else {
            throw new Error('Failed to delete image');
        }
    } catch (error: any) {
        console.error('Error deleting image:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to delete image' },
            { status: 500 }
        );
    }
}
