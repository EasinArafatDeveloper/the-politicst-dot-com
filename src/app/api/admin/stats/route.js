import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';

export async function GET() {
  try {
    await dbConnect();
    
    const totalArticles = await Article.countDocuments({ category: { $ne: 'video' } });
    const totalVideos = await Article.countDocuments({ category: 'video' });
    
    // Calculate total views
    const articles = await Article.find({}, 'views');
    const totalViews = articles.reduce((sum, article) => sum + (article.views || 0), 0);
    
    return NextResponse.json({ 
      success: true, 
      data: {
        totalArticles,
        totalVideos,
        totalViews
      } 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
