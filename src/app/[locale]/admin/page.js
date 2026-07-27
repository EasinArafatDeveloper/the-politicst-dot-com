'use client';
import { useState, useEffect } from 'react';
import { FileText, Video, Eye, TrendingUp } from 'lucide-react';

export default function AdminAnalytics() {
  const [stats, setStats] = useState({ totalArticles: 0, totalVideos: 0, totalViews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', fontSize: '18px' }}>Loading analytics...</div>;
  }

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>Analytics Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        
        {/* Total Articles Card */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#f3e8ff', color: 'var(--primary)', padding: '16px', borderRadius: '50%' }}>
            <FileText size={32} />
          </div>
          <div>
            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Total Articles</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>{stats.totalArticles}</h3>
          </div>
        </div>

        {/* Total Videos Card */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#dbeafe', color: '#3b82f6', padding: '16px', borderRadius: '50%' }}>
            <Video size={32} />
          </div>
          <div>
            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Total Videos</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>{stats.totalVideos}</h3>
          </div>
        </div>

        {/* Total Views Card */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#dcfce7', color: '#22c55e', padding: '16px', borderRadius: '50%' }}>
            <Eye size={32} />
          </div>
          <div>
            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Website Views</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>{stats.totalViews}</h3>
          </div>
        </div>

      </div>
    </div>
  );
}
