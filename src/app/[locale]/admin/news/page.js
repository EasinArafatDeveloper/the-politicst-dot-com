'use client';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { Edit, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      if (data.success) {
        setArticles(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch articles', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setArticles(articles.filter(a => a._id !== id));
        toast.success('Article deleted successfully');
      } else {
        toast.error('Failed to delete article');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('An error occurred');
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', fontSize: '18px' }}>Loading articles...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>News Articles</h1>
        <Link href="/admin/post" style={{ background: 'var(--primary)', color: 'white', padding: '10px 20px', borderRadius: '6px', fontWeight: '500' }}>
          + Create New Post
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search articles by title..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', flex: 1, outline: 'none' }}
        />
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', minWidth: '200px', outline: 'none', cursor: 'pointer' }}
        >
          <option value="">All Categories</option>
          {[...new Set(articles.map(a => a.category))].filter(Boolean).map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '16px', fontWeight: '600' }}>Title (Bangla)</th>
              <th style={{ padding: '16px', fontWeight: '600' }}>Category</th>
              <th style={{ padding: '16px', fontWeight: '600' }}>Section</th>
              <th style={{ padding: '16px', fontWeight: '600' }}>Views</th>
              <th style={{ padding: '16px', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              const filteredArticles = articles.filter(article => {
                const searchLower = searchTerm.toLowerCase();
                const matchesSearch = (article.title?.bn?.toLowerCase() || '').includes(searchLower) || 
                                      (article.title?.en?.toLowerCase() || '').includes(searchLower);
                const matchesCategory = filterCategory === '' || article.category === filterCategory;
                return matchesSearch && matchesCategory;
              });

              if (filteredArticles.length === 0) {
                return (
                  <tr>
                    <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                      No articles found matching your criteria.
                    </td>
                  </tr>
                );
              }

              return filteredArticles.map((article) => (
                <tr key={article._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '16px' }}>{article.title?.bn || article.title?.en || 'Untitled'}</td>
                  <td style={{ padding: '16px', textTransform: 'capitalize' }}>{article.category || 'N/A'}</td>
                  <td style={{ padding: '16px', textTransform: 'capitalize' }}>{article.section || 'N/A'}</td>
                  <td style={{ padding: '16px' }}>{article.views || 0}</td>
                  <td style={{ padding: '16px', display: 'flex', gap: '10px' }}>
                    <Link href={`/admin/post?id=${article._id}`} style={{ color: '#3b82f6', cursor: 'pointer' }}>
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(article._id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ));
            })()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
