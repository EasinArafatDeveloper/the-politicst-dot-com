import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await dbConnect();
    
    // Parse query params for filtering
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const section = searchParams.get('section');
    const q = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit')) || 0;

    let query = {};
    if (category) query.category = category;
    if (section) query.section = section;
    if (q) {
      query.$or = [
        { 'title.bn': { $regex: q, $options: 'i' } },
        { 'title.en': { $regex: q, $options: 'i' } }
      ];
    }

    const articles = await Article.find(query).sort({ publishedAt: -1 }).limit(limit);
    
    return NextResponse.json({ success: true, data: articles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Simple slug generation if not provided
    if (!body.slug) {
      body.slug = body.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now();
    }

    const article = await Article.create(body);
    return NextResponse.json({ success: true, data: article }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
