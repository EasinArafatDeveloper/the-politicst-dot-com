'use client';
import { useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { LayoutDashboard, FileText, Settings, LogOut, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import styles from './AdminLayout.module.css';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sidebarWidth = isCollapsed ? '80px' : '250px';

  const getLinkStyle = (path) => {
    const isActive = pathname === path;
    return {
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: isCollapsed ? 'center' : 'flex-start',
      gap: '10px', 
      color: isActive ? '#fff' : '#ddd',
      backgroundColor: isActive ? 'var(--primary)' : 'transparent',
      padding: '10px',
      borderRadius: '6px',
      transition: 'background-color 0.2s',
      fontWeight: isActive ? '500' : 'normal',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    };
  };

  const closeMobileSidebar = () => setIsMobileOpen(false);

  return (
    <div className={styles.layout}>
      {/* Mobile Overlay */}
      <div 
        className={`${styles.overlay} ${isMobileOpen ? styles.mobileOpen : ''}`} 
        onClick={closeMobileSidebar}
      />

      {/* Sidebar */}
      <aside 
        className={`${styles.sidebar} ${isMobileOpen ? styles.mobileOpen : ''}`}
        style={{ 
          width: sidebarWidth, 
          padding: isCollapsed ? '20px 10px' : '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between', marginBottom: '30px', paddingLeft: isCollapsed ? '0' : '10px' }}>
          {(!isCollapsed || isMobileOpen) && <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Admin Panel</h2>}
          <button 
            className={styles.desktopCollapseBtn}
            onClick={() => setIsCollapsed(!isCollapsed)} 
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <Link href="/admin" style={getLinkStyle('/admin')} title="Analytics Dashboard" onClick={closeMobileSidebar}>
            <LayoutDashboard size={20} style={{ flexShrink: 0 }} /> {(!isCollapsed || isMobileOpen) && <span>Analytics Dashboard</span>}
          </Link>
          <Link href="/admin/news" style={getLinkStyle('/admin/news')} title="News List" onClick={closeMobileSidebar}>
            <FileText size={20} style={{ flexShrink: 0 }} /> {(!isCollapsed || isMobileOpen) && <span>News List</span>}
          </Link>
          <Link href="/admin/post" style={getLinkStyle('/admin/post')} title="Add New Post" onClick={closeMobileSidebar}>
            <FileText size={20} style={{ flexShrink: 0 }} /> {(!isCollapsed || isMobileOpen) && <span>Add New Post</span>}
          </Link>

          <div style={{ flex: 1 }}></div>

          <div 
            title="Settings"
            style={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start', gap: '10px', color: '#ddd', cursor: 'pointer', padding: '10px', transition: 'all 0.3s' }}
          >
            <Settings size={20} style={{ flexShrink: 0 }} /> {(!isCollapsed || isMobileOpen) && <span>Settings</span>}
          </div>
          <div 
            title="Logout"
            onClick={async () => {
              await fetch('/api/admin/logout', { method: 'POST' });
              window.location.href = '/';
            }} 
            style={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start', gap: '10px', color: '#ff4d4f', cursor: 'pointer', padding: '10px', transition: 'all 0.3s' }}
          >
            <LogOut size={20} style={{ flexShrink: 0 }} /> {(!isCollapsed || isMobileOpen) && <span>Logout</span>}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main 
        className={styles.mainContent} 
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Mobile Header with Hamburger Menu */}
        <div className={styles.mobileHeader}>
          <button className={styles.menuButton} onClick={() => setIsMobileOpen(true)}>
            <Menu size={28} />
          </button>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 0 16px' }}>Admin Panel</h1>
        </div>

        {children}
      </main>
    </div>
  );
}
