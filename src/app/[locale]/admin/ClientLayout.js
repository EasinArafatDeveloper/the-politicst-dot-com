'use client';
import { Link, usePathname } from '@/i18n/routing';
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const getLinkStyle = (path) => {
    const isActive = pathname === path;
    return {
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px', 
      color: isActive ? '#fff' : '#ddd',
      backgroundColor: isActive ? 'var(--primary)' : 'transparent',
      padding: '10px',
      borderRadius: '6px',
      transition: 'background-color 0.2s',
      fontWeight: isActive ? '500' : 'normal'
    };
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '250px', 
        backgroundColor: '#111', 
        color: '#fff', 
        padding: '20px',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        zIndex: 50
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', color: 'var(--primary)', flexShrink: 0, paddingLeft: '10px' }}>Admin Panel</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <Link href="/admin" style={getLinkStyle('/admin')}>
            <LayoutDashboard size={20} /> Analytics Dashboard
          </Link>
          <Link href="/admin/news" style={getLinkStyle('/admin/news')}>
            <FileText size={20} /> News List
          </Link>
          <Link href="/admin/post" style={getLinkStyle('/admin/post')}>
            <FileText size={20} /> Add New Post
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ddd', marginTop: 'auto', cursor: 'pointer', padding: '10px' }}>
            <Settings size={20} /> Settings
          </div>
          <div 
            onClick={async () => {
              await fetch('/api/admin/logout', { method: 'POST' });
              window.location.href = '/';
            }} 
            style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ff4d4f', cursor: 'pointer' }}
          >
            <LogOut size={20} /> Logout
          </div>
        </nav>
      </aside>
      {/* Main Content */}
      <main style={{ flex: 1, padding: '30px', marginLeft: '250px', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
}
