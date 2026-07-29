import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No files received.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Option A: If ImgBB API key is provided, upload to ImgBB CDN
    if (process.env.IMGBB_API_KEY) {
      try {
        const imgbbForm = new FormData();
        imgbbForm.append('image', buffer.toString('base64'));
        const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
          method: 'POST',
          body: imgbbForm
        });
        const imgbbData = await imgbbRes.json();
        if (imgbbData.success && imgbbData.data?.url) {
          return NextResponse.json({ success: true, url: imgbbData.data.url }, { status: 201 });
        }
      } catch (imgbbErr) {
        console.error('ImgBB Upload Failed, falling back to Base64/Disk:', imgbbErr);
      }
    }

    // Option B: Serverless environment (Netlify, Vercel, AWS Lambda)
    // Serverless hosts have read-only or ephemeral filesystems where local files cannot be persisted.
    const isServerless = process.env.NETLIFY === 'true' || process.env.NODE_ENV === 'production';

    if (isServerless) {
      const mimeType = file.type || 'image/jpeg';
      const base64Image = `data:${mimeType};base64,${buffer.toString('base64')}`;
      return NextResponse.json({ success: true, url: base64Image }, { status: 201 });
    }

    // Option C: Local Development - Save file to public/uploads
    try {
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      await mkdir(uploadDir, { recursive: true });

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = uniqueSuffix + '-' + file.name.replace(/[^a-zA-Z0-9.-]/g, '');
      const filepath = path.join(uploadDir, filename);

      await writeFile(filepath, buffer);

      const fileUrl = `/uploads/${filename}`;
      return NextResponse.json({ success: true, url: fileUrl }, { status: 201 });
    } catch (fsErr) {
      console.error('Filesystem upload failed, using Base64 fallback:', fsErr);
      const mimeType = file.type || 'image/jpeg';
      const base64Image = `data:${mimeType};base64,${buffer.toString('base64')}`;
      return NextResponse.json({ success: true, url: base64Image }, { status: 201 });
    }

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload image' }, { status: 500 });
  }
}
